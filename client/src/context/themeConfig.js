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
    primary: '#3b82f6', // blue
    primarySoft: '#60a5fa',
    primaryMist: '#dbeafe',
    primaryGlow: '#93c5fd',
    accent: '#2563eb',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%)', // Bluish background for waste manager only
    glass: 'rgba(59, 130, 246, 0.2)',
    glassSoft: 'rgba(96, 165, 250, 0.15)',
    glassUltra: 'rgba(59, 130, 246, 0.3)',
    text: '#ffffff',
    textSoft: '#dbeafe',
    textMuted: '#93c5fd',
  },
};
