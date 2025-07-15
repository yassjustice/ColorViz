import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createDualModePalette } from '../utils';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const defaultPalette = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};

const defaultDarkPalette = {
  primary: '#60a5fa',
  secondary: '#a78bfa',
  accent: '#22d3ee',
  background: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  border: '#334155',
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171'
};

export const calculateContrast = (color1, color2) => {
  const getLuminance = (color) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);

  return (brightest + 0.05) / (darkest + 0.05);
};

export const getContrastRating = (ratio) => {
  if (ratio >= 7) return { level: 'AAA', color: 'text-green-600' };
  if (ratio >= 4.5) return { level: 'AA', color: 'text-blue-600' };
  if (ratio >= 3) return { level: 'A', color: 'text-yellow-600' };
  return { level: 'FAIL', color: 'text-red-600' };
};

export const generateColorVariations = (baseColor) => {
  const lighten = (color, amount) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = Math.min(255, Math.floor(((rgb >> 16) & 0xff) + (255 - ((rgb >> 16) & 0xff)) * amount));
    const g = Math.min(255, Math.floor(((rgb >> 8) & 0xff) + (255 - ((rgb >> 8) & 0xff)) * amount));
    const b = Math.min(255, Math.floor((rgb & 0xff) + (255 - (rgb & 0xff)) * amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  const darken = (color, amount) => {
    const rgb = parseInt(color.slice(1), 16);
    const r = Math.floor(((rgb >> 16) & 0xff) * (1 - amount));
    const g = Math.floor(((rgb >> 8) & 0xff) * (1 - amount));
    const b = Math.floor((rgb & 0xff) * (1 - amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  return {
    lightest: lighten(baseColor, 0.8),
    lighter: lighten(baseColor, 0.4),
    base: baseColor,
    darker: darken(baseColor, 0.2),
    darkest: darken(baseColor, 0.4)
  };
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [customPalette, setCustomPalette] = useState(null);
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get the current palette based on theme and custom settings
  const getCurrentPalette = () => {
    if (customPalette) {
      // If custom palette has dual modes, use the appropriate one
      if (customPalette.light && customPalette.dark) {
        return isDark ? customPalette.dark : customPalette.light;
      }
      // If it's a single palette, use it as is
      return customPalette;
    }
    // Fall back to default palettes
    return isDark ? defaultDarkPalette : defaultPalette;
  };

  const currentPalette = getCurrentPalette();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('colorPalettes');
      if (saved) {
        setSavedPalettes(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Failed to load saved palettes:', error);
      setSavedPalettes([]);
    }

    try {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = theme === 'dark' || (theme === null && prefersDark);
      
      setIsDark(shouldBeDark);
      
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      const root = document.documentElement;
      if (!root) return;
      
      Object.entries(currentPalette).forEach(([key, value]) => {
        if (typeof value === 'string' && value.startsWith('#')) {
          const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          root.style.setProperty(`--color-${cssVar}`, value);
          
          // Add primary-light for nav-item-active background
          if (key === 'primary') {
            try {
              const hex = value.replace('#', '');
              if (hex.length === 6) {
                const r = parseInt(hex.substr(0, 2), 16);
                const g = parseInt(hex.substr(2, 2), 16);
                const b = parseInt(hex.substr(4, 2), 16);
                root.style.setProperty(`--color-primary-light`, `rgba(${r}, ${g}, ${b}, 0.1)`);
              }
            } catch (error) {
              console.warn('Failed to generate primary-light color:', error);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Failed to apply CSS variables:', error);
    }
  }, [currentPalette, isInitialized]);

  const toggleTheme = () => {
    try {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
      
      // Use requestAnimationFrame to ensure DOM updates are smooth
      requestAnimationFrame(() => {
        if (newIsDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    } catch (error) {
      console.warn('Failed to toggle theme:', error);
    }
  };

  const applyPalette = (palette) => {
    try {
      if (palette && typeof palette === 'object') {
        // If it's a dual-mode palette, store it as is
        if (palette.light && palette.dark) {
          setCustomPalette({ ...palette });
        } else {
          // Convert single palette to dual-mode
          const dualPalette = createDualModePalette(palette);
          setCustomPalette(dualPalette);
        }
      }
    } catch (error) {
      console.warn('Failed to apply palette:', error);
    }
  };

  const savePalette = (name, palette) => {
    try {
      if (!name || !palette) return;
      
      const newPalettes = [...savedPalettes, { 
        name: String(name).trim(), 
        palette: { ...palette }, 
        id: Date.now() 
      }];
      setSavedPalettes(newPalettes);
      localStorage.setItem('colorPalettes', JSON.stringify(newPalettes));
    } catch (error) {
      console.warn('Failed to save palette:', error);
    }
  };

  const deletePalette = (id) => {
    try {
      const newPalettes = savedPalettes.filter(p => p.id !== id);
      setSavedPalettes(newPalettes);
      localStorage.setItem('colorPalettes', JSON.stringify(newPalettes));
    } catch (error) {
      console.warn('Failed to delete palette:', error);
    }
  };

  const exportPalette = (format = 'json') => {
    try {
      const palette = customPalette || { 
        light: defaultPalette, 
        dark: defaultDarkPalette 
      };
      
      if (format === 'json') {
        const dataStr = JSON.stringify(palette, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'color-palette.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      } else if (format === 'css') {
        let cssString = '';
        
        if (palette.light && palette.dark) {
          const lightVars = Object.entries(palette.light)
            .map(([key, value]) => {
              const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
              return `  --color-${cssVar}: ${value};`;
            })
            .join('\n');
          
          const darkVars = Object.entries(palette.dark)
            .map(([key, value]) => {
              const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
              return `  --color-${cssVar}: ${value};`;
            })
            .join('\n');
          
          cssString = `:root {\n${lightVars}\n}\n\n.dark {\n${darkVars}\n}`;
        } else {
          const cssVars = Object.entries(palette)
            .map(([key, value]) => {
              const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
              return `  --color-${cssVar}: ${value};`;
            })
            .join('\n');
          cssString = `:root {\n${cssVars}\n}`;
        }
        
        const dataUri = 'data:text/css;charset=utf-8,'+ encodeURIComponent(cssString);
        const exportFileDefaultName = 'color-palette.css';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    } catch (error) {
      console.warn('Failed to export palette:', error);
    }
  };

  const resetPalette = () => {
    try {
      setCustomPalette(null);
    } catch (error) {
      console.warn('Failed to reset palette:', error);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme,
      currentPalette,
      customPalette,
      applyPalette,
      resetPalette,
      savedPalettes,
      savePalette,
      deletePalette,
      exportPalette,
      calculateContrast,
      getContrastRating,
      generateColorVariations
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-dynamic-background text-dynamic-text transition-all duration-300"
      >
        {children}
      </motion.div>
    </ThemeContext.Provider>
  );
};
