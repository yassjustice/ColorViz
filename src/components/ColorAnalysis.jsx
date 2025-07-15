import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  Palette,
  Brain,
  Globe,
  Thermometer,
  Zap,
  RefreshCw,
  TrendingUp,
  Heart,
  Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { 
  generateColorHarmonies,
  analyzeColorPsychology,
  simulateColorBlindness,
  generateColorSuggestions,
  hexToHsl,
  calculateLuminance
} from '../utils/colorTheory';
import { createDualModePalette } from '../utils';
import { Button } from './ui';

const ContrastCard = ({ bgColor, textColor, label, showDetails = false }) => {
  const { calculateContrast, getContrastRating } = useTheme();
  const ratio = calculateContrast(bgColor, textColor);
  const rating = getContrastRating(ratio);

  const getAccessibilityIcon = (level) => {
    switch (level) {
      case 'AAA': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'AA': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'A': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg border border-dynamic-border relative overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">{label}</div>
          {getAccessibilityIcon(rating.level)}
        </div>
        <div className="text-xs opacity-75 mb-1">
          Contrast Ratio: <span className="font-mono">{ratio.toFixed(2)}:1</span>
        </div>
        <div className={`text-xs font-semibold ${rating.color}`}>
          WCAG {rating.level}
          {rating.level === 'AAA' && ' - Enhanced'}
          {rating.level === 'AA' && ' - Compliant'}
          {rating.level === 'A' && ' - Large Text Only'}
          {rating.level === 'FAIL' && ' - Non-Compliant'}
        </div>
        
        {showDetails && (
          <div className="mt-2 text-xs opacity-60">
            <div>Background: {bgColor}</div>
            <div>Text: {textColor}</div>
            <div>Luminance: {(calculateLuminance(bgColor) * 100).toFixed(1)}%</div>
          </div>
        )}
      </div>
      
      {/* Visual contrast indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30"
        style={{ width: `${Math.min(100, (ratio / 21) * 100)}%` }}
      />
    </motion.div>
  );
};

const ColorBlindnessSimulation = ({ colors }) => {
  const [activeSimulation, setActiveSimulation] = useState(null);
  const colorBlindnessTypes = [
    { type: 'protanopia', name: 'Protanopia', description: 'Red-blind (1% of men)' },
    { type: 'deuteranopia', name: 'Deuteranopia', description: 'Green-blind (1% of men)' },
    { type: 'tritanopia', name: 'Tritanopia', description: 'Blue-blind (0.001% population)' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSimulation(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              !activeSimulation 
                ? 'bg-primary text-gray-900 dark:text-white' 
                : 'bg-white text-gray-900 dark:bg-neutral-900 dark:text-white border border-dynamic-border'
          }`}
        >
          <Eye className="w-3 h-3 inline mr-1" />
          Normal Vision
        </button>
        {colorBlindnessTypes.map(({ type, name, description }) => (
          <button
            key={type}
            onClick={() => setActiveSimulation(type)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeSimulation === type 
                ? 'bg-primary text-gray-900 dark:text-white' 
                : 'bg-white text-gray-900 dark:bg-neutral-900 dark:text-white border border-dynamic-border'
            }`}
            title={description}
          >
            <EyeOff className="w-3 h-3 inline mr-1" />
            {name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {Object.entries(colors).map(([key, color]) => {
          const displayColor = activeSimulation 
            ? simulateColorBlindness(color, activeSimulation)
            : color;
          
          return (
            <motion.div
              key={key}
              className="aspect-square rounded-lg border border-dynamic-border overflow-hidden group relative"
              style={{ backgroundColor: displayColor }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                <div className="text-white text-xs font-medium">{key}</div>
                <div className="text-white text-xs font-mono opacity-75">{displayColor}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const ColorHarmonyAnalysis = ({ baseColor }) => {
  const harmonies = useMemo(() => generateColorHarmonies(baseColor), [baseColor]);
  const [activeHarmony, setActiveHarmony] = useState('analogous');

  const harmonyDescriptions = {
    monochromatic: 'Single hue with varying lightness - creates unity and simplicity',
    analogous: 'Adjacent colors on color wheel - natural and pleasing harmony',
    complementary: 'Opposite colors - high contrast and vibrant combinations',
    splitComplementary: 'Base color plus two adjacent to its complement - softer contrast',
    triadic: 'Three equally spaced colors - vibrant yet balanced',
    tetradic: 'Two complementary pairs - rich but challenging to balance',
    compound: 'Base color with colors adjacent to its complement'
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.keys(harmonies).map((harmonyType) => (
          <button
            key={harmonyType}
            onClick={() => setActiveHarmony(harmonyType)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
              activeHarmony === harmonyType 
                ? 'bg-primary text-gray-900 dark:text-white' 
                : 'bg-white text-gray-900 dark:bg-neutral-900 dark:text-white border border-dynamic-border'
            }`}
          >
            {harmonyType}
          </button>
        ))}
      </div>

      <div className="p-4 bg-dynamic-surface rounded-lg border border-dynamic-border">
        <h4 className="font-semibold text-dynamic-text mb-2 capitalize">
          {activeHarmony} Harmony
        </h4>
        <p className="text-sm text-dynamic-text-secondary mb-4">
          {harmonyDescriptions[activeHarmony]}
        </p>
        
        <div className="flex gap-2">
          {harmonies[activeHarmony].map((color, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 rounded-lg border border-dynamic-border flex items-center justify-center group relative"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black text-white text-xs px-2 py-1 rounded font-mono">
                  {color}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PsychologyAnalysis = ({ colors }) => {
  const analysis = useMemo(() => analyzeColorPsychology(Object.values(colors)), [colors]);
  
  const temperatureStats = analysis.reduce((acc, color) => {
    acc[color.temperature] = (acc[color.temperature] || 0) + 1;
    return acc;
  }, {});

  const dominantTemperature = Object.entries(temperatureStats).reduce((a, b) => 
    temperatureStats[a[0]] > temperatureStats[b[0]] ? a : b
  )[0];

  return (
    <div className="space-y-6">
      {/* Temperature Analysis */}
      <div className="p-4 bg-dynamic-surface rounded-lg border border-dynamic-border">
        <div className="flex items-center gap-2 mb-3">
          <Thermometer className="w-4 h-4 text-dynamic-text-secondary" />
          <h4 className="font-semibold text-dynamic-text">Color Temperature Balance</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {Object.entries(temperatureStats).map(([temp, count]) => (
            <div key={temp} className="text-center">
              <div className={`text-2xl font-bold ${
                temp === 'warm' ? 'text-red-500' : 
                temp === 'cool' ? 'text-blue-500' : 'text-gray-500'
              }`}>
                {count}
              </div>
              <div className="text-xs text-dynamic-text-secondary capitalize">{temp}</div>
            </div>
          ))}
        </div>
        
        <div className="text-sm text-dynamic-text-secondary">
          <span className="font-medium">Dominant Temperature:</span> {dominantTemperature}
          {dominantTemperature === 'warm' && ' - Energetic, exciting, attention-grabbing'}
          {dominantTemperature === 'cool' && ' - Calming, professional, trustworthy'}
          {dominantTemperature === 'neutral' && ' - Balanced, versatile, timeless'}
        </div>
      </div>

      {/* Emotional Impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analysis.slice(0, 4).map((colorAnalysis, index) => (
          <motion.div
            key={index}
            className="p-4 bg-dynamic-surface rounded-lg border border-dynamic-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-6 h-6 rounded-full border border-dynamic-border"
                style={{ backgroundColor: colorAnalysis.color }}
              />
              <div>
                <div className="font-medium text-dynamic-text capitalize">
                  {colorAnalysis.dominantColor}
                </div>
                <div className="text-xs text-dynamic-text-secondary">
                  {colorAnalysis.temperature} • {colorAnalysis.energy} energy
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-dynamic-text">Emotions:</span>
                <div className="text-dynamic-text-secondary">
                  {colorAnalysis.emotions.join(', ')}
                </div>
              </div>
              
              <div>
                <span className="font-medium text-dynamic-text">Best for:</span>
                <div className="text-dynamic-text-secondary">
                  {colorAnalysis.industries.join(', ')}
                </div>
              </div>
              
              {colorAnalysis.culturalNotes && (
                <div>
                  <span className="font-medium text-dynamic-text">Cultural notes:</span>
                  <div className="text-dynamic-text-secondary text-xs">
                    {colorAnalysis.culturalNotes}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PaletteFixSuggestions = ({ colors, onApplySuggestion }) => {
  // Only show actionable suggestions for contrast/accessibility
  const suggestions = useMemo(() => {
    const all = generateColorSuggestions(colors);
    // Only keep contrast suggestions with actionable fixes
    return all.filter(s => s.type === 'contrast' && s.fixes && s.fixes.length > 0);
  }, [colors]);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'low': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  if (suggestions.length === 0) {
    return (
      <div className="p-8 text-center bg-dynamic-surface rounded-lg border border-dynamic-border">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="font-semibold text-dynamic-text mb-2">No Contrast Issues Detected</h3>
        <p className="text-dynamic-text-secondary">
          All color combinations pass accessibility standards.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={index}
          className="p-4 bg-dynamic-surface rounded-lg border border-dynamic-border"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start gap-3 mb-3">
            {getSeverityIcon(suggestion.severity)}
            <div className="flex-1">
              <h4 className="font-semibold text-dynamic-text mb-1">
                {suggestion.title}
              </h4>
              <p className="text-sm text-dynamic-text-secondary mb-3">
                {suggestion.description}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {suggestion.fixes.map((fix, fixIndex) => (
              <div key={fixIndex} className="flex items-start gap-2 text-sm">
                <div className="w-1 h-1 rounded-full bg-dynamic-text-secondary mt-2 flex-shrink-0" />
                <div className="text-dynamic-text-secondary">
                  {typeof fix === 'string' ? fix : fix.problem || fix.solution}
                </div>
              </div>
            ))}
          </div>
          {suggestion.type === 'contrast' && (
            <Button
              variant="primary"
              size="sm"
              className="mt-3 flex items-center gap-2"
              onClick={() => onApplySuggestion && onApplySuggestion(suggestion)}
            >
              <RefreshCw className="w-3 h-3" />
              Apply Palette Fix
            </Button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export const ColorAnalysis = () => {
  const { currentPalette, applyPalette } = useTheme();
  const [activeTab, setActiveTab] = useState('accessibility');
  const [showDetailedContrast, setShowDetailedContrast] = useState(false);
  const [paletteVersion, setPaletteVersion] = useState(0);

  // Always use the latest palette for analysis and suggestions
  const tabs = [
    { id: 'accessibility', name: 'Accessibility', icon: Shield },
    { id: 'harmony', name: 'Color Harmony', icon: Palette },
    { id: 'psychology', name: 'Psychology', icon: Brain },
    { id: 'suggestions', name: 'Palette Fixes', icon: Lightbulb },
    { id: 'colorblind', name: 'Color Blind', icon: Eye }
  ];

  // Memoize contrast tests so they always reflect the current palette
  const contrastTests = useMemo(() => [
    { bg: currentPalette.primary, text: '#ffffff', label: 'Primary + White' },
    { bg: currentPalette.primary, text: currentPalette.text, label: 'Primary + Text' },
    { bg: currentPalette.secondary, text: '#ffffff', label: 'Secondary + White' },
    { bg: currentPalette.background, text: currentPalette.text, label: 'Background + Text' },
    { bg: currentPalette.surface, text: currentPalette.text, label: 'Surface + Text' },
    { bg: currentPalette.accent, text: '#ffffff', label: 'Accent + White' },
    { bg: currentPalette.success, text: '#ffffff', label: 'Success + White' },
    { bg: currentPalette.warning, text: '#000000', label: 'Warning + Black' },
    { bg: currentPalette.error, text: '#ffffff', label: 'Error + White' }
  ], [currentPalette]);

  // When a suggestion is applied, update the palette and force a re-analysis
  // Iteratively apply all actionable fixes until all contrast issues are resolved or no further progress
  // Only apply the best single fix per click, not all at once
  const handleApplySuggestion = (suggestion) => {
    if (suggestion.type === 'contrast' && suggestion.fixes && suggestion.fixes.length > 0) {
      // Find the first actionable fix (the best one, as per engine)
      const bestFix = suggestion.fixes.find(fix => fix.role && fix.color);
      if (!bestFix) return;
      let newPalette = { ...currentPalette, [bestFix.role]: bestFix.color };
      // Always apply as dual-mode palette for both light/dark
      applyPalette(createDualModePalette(newPalette));
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-dynamic-surface rounded-lg border border-dynamic-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                ${isActive
                  ? 'bg-dynamic-primary border-2 border-dynamic-primary shadow-sm'
                  : 'text-dynamic-text-secondary hover:bg-dynamic-background hover:text-dynamic-text border border-transparent'}
                ${isActive
                  ? 'text-white dark:text-gray-900' // Always readable text for selected tab
                  : ''}
              `}
              style={isActive ? { boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' } : {}}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'accessibility' && (
          <motion.div
            key="accessibility"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Accessibility Analysis */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-dynamic-text flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Accessibility Analysis
                </h2>
                <button
                  onClick={() => setShowDetailedContrast(!showDetailedContrast)}
                  className="text-sm text-dynamic-text-secondary hover:text-dynamic-text flex items-center gap-1"
                >
                  {showDetailedContrast ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showDetailedContrast ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {contrastTests.map((test, index) => (
                  test.bg && test.text && (
                    <ContrastCard
                      key={index}
                      bgColor={test.bg}
                      textColor={test.text}
                      label={test.label}
                      showDetails={showDetailedContrast}
                    />
                  )
                ))}
              </div>

              <div className="p-4 bg-dynamic-surface rounded-lg border border-dynamic-border">
                <h3 className="font-semibold text-dynamic-text mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  WCAG 2.1 Guidelines Reference
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-dynamic-text-secondary">FAIL (&lt; 3:1) - Inadequate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-dynamic-text-secondary">A (3:1+) - Large text only</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-dynamic-text-secondary">AA (4.5:1+) - Standard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-dynamic-text-secondary">AAA (7:1+) - Enhanced</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    <strong>Tip:</strong> AA level is the legal requirement for most websites. 
                    AAA provides enhanced accessibility for users with visual impairments.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'harmony' && (
          <motion.div
            key="harmony"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-dynamic-text mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Harmony Analysis
            </h2>
            
            <ColorHarmonyAnalysis baseColor={currentPalette.primary} />
          </motion.div>
        )}

        {activeTab === 'psychology' && (
          <motion.div
            key="psychology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-dynamic-text mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Color Psychology & Emotional Impact
            </h2>
            
            <PsychologyAnalysis colors={currentPalette} />
          </motion.div>
        )}

        {activeTab === 'suggestions' && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-dynamic-text mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Palette Suggestions
            </h2>
            
            <PaletteFixSuggestions 
              colors={currentPalette} 
              onApplySuggestion={handleApplySuggestion}
            />
          </motion.div>
        )}

        {activeTab === 'colorblind' && (
          <motion.div
            key="colorblind"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-dynamic-text mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Color Blindness Simulation
            </h2>
            
            <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>About 8% of men and 0.5% of women</strong> have some form of color vision deficiency. 
                Test your palette to ensure it's accessible to all users.
              </p>
            </div>
            
            <ColorBlindnessSimulation colors={currentPalette} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Palette Overview - Always Visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-xl font-bold text-dynamic-text mb-6">Current Palette Overview</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(currentPalette).map(([key, color]) => {
            if (!color) return null;
            const hsl = hexToHsl(color);
            const luminance = calculateLuminance(color);
            
            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-lg border border-dynamic-border overflow-hidden group cursor-pointer relative"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <div className="text-white text-xs font-medium mb-1">{key}</div>
                  <div className="text-white text-xs font-mono opacity-90 mb-1">{color}</div>
                  <div className="text-white text-xs opacity-75">
                    <div>H:{hsl.h}° S:{hsl.s}% L:{hsl.l}%</div>
                    <div>Lum: {(luminance * 100).toFixed(1)}%</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
