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
};
