export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  
  OPENCAGE_API_KEY: import.meta.env.VITE_OPENCAGE_API_KEY,
  
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
};

export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  
  SCAN_ITEM: '/api/scanner/identify',
  SCAN_HISTORY: '/api/scanner/history',
  
  GET_LOCATIONS: '/api/locations',
  GET_NEARBY_CENTERS: '/api/locations/nearby',
  
  GET_PROFILE: '/api/user/profile',
  UPDATE_PROFILE: '/api/user/profile',
  GET_POINTS: '/api/user/points',
  GET_DASHBOARD: '/api/user/dashboard',
  GET_WASTE_ITEMS: '/api/user/waste-items',
  
  GET_ADMIN_DASHBOARD: '/api/admin/dashboard',
  GET_REPORTS: '/api/admin/reports',
  GET_USERS: '/api/admin/users',
  SEED_DATA: '/api/admin/seed',
  
  GET_MANAGER_STATS: '/api/manager/dashboard',
  GET_SCHEDULE: '/api/manager/schedule',
  GET_VEHICLES: '/api/manager/vehicles',
  GET_REQUESTS: '/api/manager/requests',
  UPDATE_VEHICLE_STATUS: '/api/manager/vehicles/status',
  
  SEND_MESSAGE: '/api/chat/send',
  GET_MESSAGES: '/api/chat/messages',
  
  GET_REMINDERS: '/api/reminders',
  CREATE_REMINDER: '/api/reminders/create',
  DELETE_REMINDER: '/api/reminders/delete',
};

export const EXTERNAL_APIS = {
  GEMINI: 'https://generativelanguage.googleapis.com/v1beta',
  OPENCAGE: 'https://api.opencagedata.com/geocode/v1/json',
  OPENWEATHER: 'https://api.openweathermap.org/data/2.5',
  OPENSTREETMAP: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

export const checkAPIStatus = () => {
  const status = {
    backend: !!API_CONFIG.BASE_URL,
    gemini: API_CONFIG.GEMINI_API_KEY && API_CONFIG.GEMINI_API_KEY !== 'your_gemini_api_key_here',
    googleMaps: API_CONFIG.GOOGLE_MAPS_API_KEY && API_CONFIG.GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here',
    opencage: API_CONFIG.OPENCAGE_API_KEY && API_CONFIG.OPENCAGE_API_KEY !== 'your_opencage_geocoding_api_key_here',
    weather: API_CONFIG.WEATHER_API_KEY && API_CONFIG.WEATHER_API_KEY !== 'your_openweather_api_key_here',
  };
  
  return status;
};

export default API_CONFIG;
