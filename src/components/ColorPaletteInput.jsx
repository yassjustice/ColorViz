import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  Sparkles,
  Lightbulb,
  RefreshCw,
  Wand2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
  parseColorsFromText, 
  isValidHex, 
  generateRandomPalette, 
  createDualModePalette 
} from '../utils';
import { 
  generateColorSuggestions, 
  generateColorHarmonies 
} from '../utils/colorTheory';
import { calculateContrast } from '../context/ThemeContext';

const ColorInput = ({ color, onChange, label }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(color);

  useEffect(() => {
    setValue(color);
  }, [color]);

  const handleSubmit = () => {
    try {
      if (isValidHex(value)) {
        onChange(value);
      } else {
        setValue(color);
      }
    } catch (error) {
      console.warn('Error submitting color:', error);
      setValue(color);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    try {
      if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Escape') {
        setValue(color);
        setIsEditing(false);
      }
    } catch (error) {
      console.warn('Error handling key press:', error);
    }
  };

  const handleColorClick = (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
    } catch (error) {
      console.warn('Error handling color click:', error);
    }
  };

  const handleInputBlur = () => {
    try {
      handleSubmit();
    } catch (error) {
      console.warn('Error handling input blur:', error);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      className="flex flex-col space-y-2"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <label className="text-sm font-medium text-dynamic-text-secondary">{label}</label>
      <div className="flex items-center space-x-2">
        <div
          className="w-12 h-12 rounded-lg border-2 border-dynamic-border cursor-pointer shadow-sm"
          style={{ backgroundColor: color || '#000000' }}
          onClick={handleColorClick}
        />
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyPress}
            className="input flex-1"
            autoFocus
          />
        ) : (
          <div
            className="flex-1 px-3 py-2 bg-dynamic-surface border border-dynamic-border rounded-lg cursor-pointer hover:bg-dynamic-background transition-colors"
            onClick={handleColorClick}
          >
            <span className="text-dynamic-text font-mono">{color}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const PaletteCard = ({ palette, onApply, onDelete, name }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <motion.div
      layout
      className="card"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-dynamic-text">{name}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="p-1.5 text-dynamic-text-secondary hover:text-dynamic-text rounded-lg hover:bg-dynamic-background transition-colors"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button
            onClick={() => onApply(palette)}
            className="btn-primary text-sm py-1.5 px-3"
          >
            Apply
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex space-x-1 mb-3">
        {Object.entries(palette).slice(0, 6).map(([key, color]) => (
          <div
            key={key}
            className="flex-1 h-8 rounded-md border border-dynamic-border"
            style={{ backgroundColor: color }}
            title={`${key}: ${color}`}
          />
        ))}
      </div>
      
      {showPreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-2 gap-2 text-xs"
        >
          {Object.entries(palette).map(([key, color]) => (
            <div key={key} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded border border-dynamic-border"
                style={{ backgroundColor: color }}
              />
              <span className="text-dynamic-text-secondary font-mono">{color}</span>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export const ColorPaletteInput = () => {
  const {
    currentPalette,
    customPalette,
    applyPalette,
    resetPalette,
    savedPalettes,
    savePalette,
    deletePalette,
    exportPalette
  } = useTheme();

  const [textInput, setTextInput] = useState('');
  const [editingPalette, setEditingPalette] = useState(currentPalette);
  const [paletteName, setPaletteName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleColorChange = (colorKey, newColor) => {
    try {
      const updated = { ...editingPalette, [colorKey]: newColor };
      setEditingPalette(updated);
      
      // Create dual-mode palette from the updated colors
      const dualPalette = createDualModePalette(updated);
      applyPalette(dualPalette);
    } catch (error) {
      console.warn('Error changing color:', error);
    }
  };

  const handleTextInputSubmit = () => {
    try {
      const colors = parseColorsFromText(textInput);
      if (colors.length >= 3) {
        const basePalette = {
          primary: colors[0] || currentPalette.primary,
          secondary: colors[1] || currentPalette.secondary,
          accent: colors[2] || currentPalette.accent,
          background: colors[3] || currentPalette.background,
          surface: colors[4] || currentPalette.surface,
          text: colors[5] || currentPalette.text
        };
        
        // Create dual-mode palette
        const dualPalette = createDualModePalette(basePalette);
        setEditingPalette(dualPalette.light); // Show light mode in editor
        applyPalette(dualPalette); // Apply dual-mode palette
        setTextInput('');
      }
    } catch (error) {
      console.warn('Error processing text input:', error);
    }
  };

  const handleRandomPalette = () => {
    try {
      const randomDualPalette = generateRandomPalette();
      setEditingPalette(randomDualPalette.light); // Show light mode in editor
      applyPalette(randomDualPalette); // Apply dual-mode palette
    } catch (error) {
      console.warn('Error generating random palette:', error);
    }
  };

  const handleSavePalette = () => {
    if (paletteName.trim()) {
      savePalette(paletteName.trim(), editingPalette);
      setPaletteName('');
      setShowSaveDialog(false);
    }
  };

  const handleExport = (format) => {
    exportPalette(format);
  };

  const handleApplyAISuggestions = () => {
    try {
      const suggestions = generateColorSuggestions(editingPalette);
      
      // Apply the first high-priority suggestion if available
      if (suggestions.length > 0) {
        const highPrioritySuggestion = suggestions.find(s => s.severity === 'high') || suggestions[0];
        
        if (highPrioritySuggestion.type === 'contrast') {
          // Auto-fix contrast issues by adjusting problematic colors
          const improvedPalette = autoFixContrastIssues(editingPalette);
          const dualPalette = createDualModePalette(improvedPalette);
          setEditingPalette(dualPalette.light);
          applyPalette(dualPalette);
        } else if (highPrioritySuggestion.type === 'harmony') {
          // Apply harmony-based improvements
          handleGenerateHarmony();
        }
      } else {
        // No critical issues, generate an optimized version
        const optimizedPalette = optimizePaletteForAccessibility(editingPalette);
        const dualPalette = createDualModePalette(optimizedPalette);
        setEditingPalette(dualPalette.light);
        applyPalette(dualPalette);
      }
    } catch (error) {
      console.warn('Error applying AI suggestions:', error);
    }
  };

  const handleGenerateHarmony = () => {
    try {
      // Generate harmonious colors based on the primary color
      const primaryColor = editingPalette.primary || '#3b82f6';
      const harmonies = generateColorHarmonies(primaryColor);
      
      // Create a new palette using analogous harmony as base
      const harmonizedPalette = {
        ...editingPalette,
        primary: harmonies.analogous[1], // center color
        secondary: harmonies.analogous[0], // left color
        accent: harmonies.analogous[2], // right color
        // Keep functional colors but adjust if needed
        success: harmonies.complementary[1], // Use complementary for contrast
      };
      
      const dualPalette = createDualModePalette(harmonizedPalette);
      setEditingPalette(dualPalette.light);
      applyPalette(dualPalette);
    } catch (error) {
      console.warn('Error generating harmony:', error);
    }
  };

  // Helper function to auto-fix contrast issues
  const autoFixContrastIssues = (palette) => {
    const improved = { ...palette };
    
    // Ensure text has good contrast against backgrounds
    if (calculateContrast(improved.text, improved.background) < 4.5) {
      improved.text = improved.background === '#ffffff' ? '#1a1a1a' : '#ffffff';
    }
    
    // Ensure primary color works well with white text
    if (calculateContrast('#ffffff', improved.primary) < 4.5) {
      // Darken the primary color
      const hsl = hexToHsl(improved.primary);
      improved.primary = hslToHex(hsl.h, hsl.s, Math.max(30, hsl.l - 20));
    }
    
    return improved;
  };

  // Helper function to optimize palette for accessibility
  const optimizePaletteForAccessibility = (palette) => {
    const optimized = { ...palette };
    
    // Enhance contrast ratios while maintaining color relationships
    const suggestions = generateColorSuggestions(palette);
    
    // Apply automatic improvements based on color theory
    Object.keys(optimized).forEach(key => {
      if (optimized[key]) {
        const hsl = hexToHsl(optimized[key]);
        
        // Slightly adjust saturation and lightness for better accessibility
        if (key === 'text' || key === 'textSecondary') {
          // Ensure text colors are dark enough
          optimized[key] = hslToHex(hsl.h, Math.min(hsl.s, 20), Math.min(hsl.l, 20));
        } else if (key === 'background' || key === 'surface') {
          // Ensure background colors are light enough
          optimized[key] = hslToHex(hsl.h, Math.min(hsl.s, 10), Math.max(hsl.l, 95));
        }
      }
    });
    
    return optimized;
  };

  // Import helper functions (these would need to be imported from colorTheory.js)
  const hexToHsl = (hex) => {
    // Import from colorTheory.js
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;

    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToHex = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return (
    <div className="space-y-8">
      {/* Quick Text Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Palette className="text-dynamic-primary" size={24} />
          <h2 className="text-xl font-bold text-dynamic-text">Quick Palette Input</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dynamic-text-secondary mb-2">
              Paste colors (e.g., #819A91 #A7C1A8 #D1D8BE #EEEFE0)
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="#819A91 #A7C1A8 #D1D8BE #EEEFE0"
                className="input flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleTextInputSubmit()}
              />
              <button
                onClick={handleTextInputSubmit}
                className="btn-primary"
                disabled={!textInput.trim()}
              >
                Apply
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleRandomPalette}
              className="btn-outline flex items-center space-x-2"
            >
              <RefreshCw size={16} />
              <span>Random Palette</span>
            </button>
            
            <button
              onClick={handleApplyAISuggestions}
              className="btn-secondary flex items-center space-x-2"
            >
              <Sparkles size={16} />
              <span>Auto-fix Palette</span>
            </button>
            
            <button
              onClick={handleGenerateHarmony}
              className="btn-outline flex items-center space-x-2"
            >
              <Wand2 size={16} />
              <span>Generate Harmony</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Manual Color Editing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-dynamic-text mb-6">Edit Colors Manually</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(editingPalette).map(([key, color]) => (
            <ColorInput
              key={key}
              color={color}
              onChange={(newColor) => handleColorChange(key, newColor)}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-dynamic-border">
          <div className="flex space-x-2 mb-2 md:mb-0">
            <button
              onClick={() => setShowSaveDialog(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Save Palette</span>
            </button>
            <button
              onClick={resetPalette}
              className="btn-outline"
            >
              Reset
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport('css')}
              className="btn-outline flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Export CSS</span>
            </button>
            <button
              onClick={() => handleExport('json')}
              className="btn-outline flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              e.preventDefault();
              e.stopPropagation();
              setShowSaveDialog(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dynamic-surface rounded-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <h3 className="text-lg font-bold text-dynamic-text mb-4">Save Palette</h3>
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="Enter palette name..."
              className="input mb-4"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSavePalette()}
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSavePalette}
                className="btn-primary flex-1"
                disabled={!paletteName.trim()}
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Saved Palettes */}
      {savedPalettes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-bold text-dynamic-text mb-6">Saved Palettes</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {savedPalettes.map((item) => (
              <PaletteCard
                key={item.id}
                name={item.name}
                palette={item.palette}
                onApply={applyPalette}
                onDelete={() => deletePalette(item.id)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
