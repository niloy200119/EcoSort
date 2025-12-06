import { createContext } from 'react';

export const ThemeContext = createContext();

export const themes = {
  citizen: {
    name: 'citizen',
    primary: '#2E6F40', // forest green
    primarySoft: '#3a8450',
    primaryMist: '#d4e8d9',
    primaryGlow: '#4a9960',
    accent: '#1a5a30',
    background: '#2E6F40', // Same as global forest green
    glass: 'rgba(46, 111, 64, 0.2)',
    glassSoft: 'rgba(74, 153, 96, 0.15)',
    glassUltra: 'rgba(46, 111, 64, 0.3)',
    text: '#ffffff',
    textSoft: '#e8f5eb',
    textMuted: '#d4e8d9',
  },
  admin: {
    name: 'admin',
    primary: '#f59e0b', // amber
    primarySoft: '#fbbf24',
    primaryMist: '#fef3c7',
    primaryGlow: '#fcd34d',
    accent: '#d97706',
    background: '#2E6F40', // Same forest green background as all pages
    glass: 'rgba(254, 243, 199, 0.4)',
    glassSoft: 'rgba(253, 230, 138, 0.3)',
    glassUltra: 'rgba(254, 243, 199, 0.6)',
    text: '#ffffff',
    textSoft: '#fef3c7',
    textMuted: '#fbbf24',
  },
  'waste-manager': {
    name: 'waste-manager',
    primary: '#6b7280', // ash gray
    primarySoft: '#9ca3af',
    primaryMist: '#e5e7eb',
    primaryGlow: '#9ca3af',
    accent: '#4b5563',
    background: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #374151 100%)', // Ash gray background for waste manager only
    glass: 'rgba(107, 114, 128, 0.2)',
    glassSoft: 'rgba(156, 163, 175, 0.15)',
    glassUltra: 'rgba(107, 114, 128, 0.3)',
    text: '#ffffff',
    textSoft: '#e5e7eb',
    textMuted: '#d1d5db',
  },
};
