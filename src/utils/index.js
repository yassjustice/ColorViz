import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const isValidHex = (hex) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
};

export const generateShades = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  
  const shades = [];
  for (let i = 0; i <= 10; i++) {
    const factor = i / 10;
    const r = Math.round(rgb.r + (255 - rgb.r) * factor);
    const g = Math.round(rgb.g + (255 - rgb.g) * factor);
    const b = Math.round(rgb.b + (255 - rgb.b) * factor);
    shades.push(rgbToHex(r, g, b));
  }
  return shades.reverse();
};

export const generateTints = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  
  const tints = [];
  for (let i = 0; i <= 10; i++) {
    const factor = i / 10;
    const r = Math.round(rgb.r * (1 - factor));
    const g = Math.round(rgb.g * (1 - factor));
    const b = Math.round(rgb.b * (1 - factor));
    tints.push(rgbToHex(r, g, b));
  }
  return tints;
};

export const parseColorsFromText = (text) => {
  const hexPattern = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
  const matches = text.match(hexPattern);
  return matches ? [...new Set(matches)] : [];
};

export const generateRandomPalette = () => {
  const generateRandomHex = () => {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  };
  
  // Generate a base palette for light mode
  const basePrimary = generateRandomHex();
  const baseSecondary = generateRandomHex();
  const baseAccent = generateRandomHex();
  
  return {
    light: {
      primary: basePrimary,
      secondary: baseSecondary,
      accent: baseAccent,
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    dark: {
      primary: lightenColor(basePrimary, 0.2),
      secondary: lightenColor(baseSecondary, 0.2),
      accent: lightenColor(baseAccent, 0.2),
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      textSecondary: '#94a3b8',
      border: '#334155',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    }
  };
};

export const lightenColor = (hex, factor) => {
  try {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const lighten = (channel) => {
      return Math.min(255, Math.round(channel + (255 - channel) * factor));
    };
    
    return rgbToHex(lighten(rgb.r), lighten(rgb.g), lighten(rgb.b));
  } catch (error) {
    console.warn('Error lightening color:', error);
    return hex;
  }
};

export const darkenColor = (hex, factor) => {
  try {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const darken = (channel) => {
      return Math.max(0, Math.round(channel * (1 - factor)));
    };
    
    return rgbToHex(darken(rgb.r), darken(rgb.g), darken(rgb.b));
  } catch (error) {
    console.warn('Error darkening color:', error);
    return hex;
  }
};

export const createDualModePalette = (basePalette) => {
  try {
    return {
      light: {
        primary: basePalette.primary || '#3b82f6',
        secondary: basePalette.secondary || '#8b5cf6',
        accent: basePalette.accent || '#06b6d4',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
        textSecondary: '#64748b',
        border: '#e2e8f0',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      },
      dark: {
        primary: lightenColor(basePalette.primary || '#3b82f6', 0.15),
        secondary: lightenColor(basePalette.secondary || '#8b5cf6', 0.15),
        accent: lightenColor(basePalette.accent || '#06b6d4', 0.15),
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f1f5f9',
        textSecondary: '#94a3b8',
        border: '#334155',
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171'
      }
    };
  } catch (error) {
    console.warn('Error creating dual mode palette:', error);
    return {
      light: basePalette,
      dark: basePalette
    };
  }
};
