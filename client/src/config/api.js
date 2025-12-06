// API Configuration
export const API_CONFIG = {
  // Backend API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  
  // Google Gemini AI
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  
  // Google Maps API
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  
  // OpenCage Geocoding API
  OPENCAGE_API_KEY: import.meta.env.VITE_OPENCAGE_API_KEY,
  
  // OpenWeather API
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  
  // Scanner
  SCAN_ITEM: '/api/scanner/identify',
  SCAN_HISTORY: '/api/scanner/history',
  
  // Waste Centers
  GET_CENTERS: '/api/centers',
  GET_NEARBY_CENTERS: '/api/centers/nearby',
  
  // User
  GET_PROFILE: '/api/user/profile',
  UPDATE_PROFILE: '/api/user/profile',
  GET_POINTS: '/api/user/points',
  
  // Admin
  GET_ANALYTICS: '/api/admin/analytics',
  GET_REPORTS: '/api/admin/reports',
  
  // Waste Manager
  GET_SCHEDULE: '/api/manager/schedule',
  GET_VEHICLES: '/api/manager/vehicles',
  GET_REQUESTS: '/api/manager/requests',
  UPDATE_VEHICLE_STATUS: '/api/manager/vehicles/status',
  
  // Chat
  SEND_MESSAGE: '/api/chat/send',
  GET_MESSAGES: '/api/chat/messages',
  
  // Reminders
  GET_REMINDERS: '/api/reminders',
  CREATE_REMINDER: '/api/reminders/create',
  DELETE_REMINDER: '/api/reminders/delete',
};

// External API URLs
export const EXTERNAL_APIS = {
  GEMINI: 'https://generativelanguage.googleapis.com/v1beta',
  OPENCAGE: 'https://api.opencagedata.com/geocode/v1/json',
  OPENWEATHER: 'https://api.openweathermap.org/data/2.5',
  OPENSTREETMAP: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};

// API Status Check
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
