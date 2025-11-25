import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null, // 'citizen' or 'admin'
      isAuthenticated: false,
      
      login: (userData) => {
        set({
          user: userData,
          role: userData.role,
          isAuthenticated: true,
        });
      },
      
      logout: () => {
        set({
          user: null,
          role: null,
          isAuthenticated: false,
        });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: 'ecosort-auth',
    }
  )
);

export default useAuthStore;
