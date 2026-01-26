import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('ecosort-auth') || '{}');
    const token = user?.state?.token; // Accessing nested state from Zustand persist
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during registration' };
    }
  },

  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_DASHBOARD);
      return response.data;
    } catch (error) {
        console.warn('Failed to fetch dashboard stats, using fallback', error);
        throw error.response?.data || { message: 'Failed to fetch dashboard stats' };
    }
  },

  getManagerStats: async () => {
    try {
        const response = await api.get(API_ENDPOINTS.GET_MANAGER_STATS);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch manager stats' };
    }
  },

  getSchedule: async () => {
      try {
          const response = await api.get(API_ENDPOINTS.GET_SCHEDULE);
          return response.data;
      } catch (error) {
          throw error.response?.data || { message: 'Failed to fetch schedule' };
      }
  },

  getVehicles: async () => {
      try {
          const response = await api.get(API_ENDPOINTS.GET_VEHICLES);
          return response.data;
      } catch (error) {
          throw error.response?.data || { message: 'Failed to fetch vehicles' };
      }
  },

  getRequests: async () => {
      try {
          const response = await api.get(API_ENDPOINTS.GET_REQUESTS);
          return response.data;
      } catch (error) {
          throw error.response?.data || { message: 'Failed to fetch requests' };
      }
  },

  seedData: async () => {
      try {
          const response = await api.post(API_ENDPOINTS.SEED_DATA);
          return response.data;
      } catch (error) {
          throw error.response?.data || { message: 'Failed to seed data' };
      }
  },

  getLocations: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.GET_LOCATIONS);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch locations' };
    }
  },

  getWasteItems: async () => {
    try {
        const response = await api.get(API_ENDPOINTS.GET_WASTE_ITEMS);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Failed to fetch waste items' };
    }
  },

  getAdminStats: async () => {
      try {
          const response = await api.get(API_ENDPOINTS.GET_ADMIN_DASHBOARD);
          return response.data;
      } catch (error) {
          throw error.response?.data || { message: 'Failed to fetch admin stats' };
      }
  }
};

export default authService;
