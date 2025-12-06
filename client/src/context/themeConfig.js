import { createContext } from 'react';

export const ThemeContext = createContext();

export const themes = {
  citizen: {
    name: 'citizen',
    primary: '#10b981', // emerald
    primarySoft: '#34d399',
    primaryMist: '#d1fae5',
    primaryGlow: '#6ee7b7',
    accent: '#059669',
    background: '#ecfdf5',
    glass: 'rgba(209, 250, 229, 0.4)',
    glassSoft: 'rgba(167, 243, 208, 0.3)',
    glassUltra: 'rgba(209, 250, 229, 0.6)',
    text: '#065f46',
    textSoft: '#047857',
    textMuted: '#6b7280',
  },
  admin: {
    name: 'admin',
    primary: '#f59e0b', // amber
    primarySoft: '#fbbf24',
    primaryMist: '#fef3c7',
    primaryGlow: '#fcd34d',
    accent: '#d97706',
    background: '#fffbeb',
    glass: 'rgba(254, 243, 199, 0.4)',
    glassSoft: 'rgba(253, 230, 138, 0.3)',
    glassUltra: 'rgba(254, 243, 199, 0.6)',
    text: '#78350f',
    textSoft: '#92400e',
    textMuted: '#6b7280',
  },
  'waste-manager': {
    name: 'waste-manager',
    primary: '#059669', // forest green
    primarySoft: '#10b981',
    primaryMist: '#d1fae5',
    primaryGlow: '#34d399',
    accent: '#047857',
    background: '#064e3b',
    glass: 'rgba(5, 150, 105, 0.2)',
    glassSoft: 'rgba(16, 185, 129, 0.15)',
    glassUltra: 'rgba(5, 150, 105, 0.3)',
    text: '#ecfdf5',
    textSoft: '#d1fae5',
    textMuted: '#a7f3d0',
  },
};
