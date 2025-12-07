import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(email, password);
          const { user, accessToken } = response.data;
          
          set({
            user: user,
            token: accessToken,
            role: user.role,
            isAuthenticated: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
          set({ 
            error: error.message || 'Login failed',
            isLoading: false,
            isAuthenticated: false
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(userData);
          const { user, accessToken } = response.data;
          
          set({
            user: user,
            token: accessToken,
            role: user.role,
            isAuthenticated: true,
            isLoading: false,
          });
          return response;
        } catch (error) {
            set({ 
                error: error.message || 'Registration failed',
                isLoading: false,
                isAuthenticated: false
            });
            throw error;
        }
      },
      
      logout: async () => {
        try {
            await authService.logout();
        } finally {
            set({
                user: null,
                token: null,
                role: null,
                isAuthenticated: false,
                error: null
            });
        }
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'ecosort-auth',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        role: state.role, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useAuthStore;
