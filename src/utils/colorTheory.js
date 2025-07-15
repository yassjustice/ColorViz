// Advanced Color Theory & Analysis Utilities
// Based on extensive research on color psychology, accessibility, and UI/UX best practices

/**
 * Color Theory Utilities for Professional Design Analysis
 * Implements color harmony, psychological analysis, and accessibility standards
 */

// Color space conversion utilities
export const hexToHsl = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
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

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

export const hslToHex = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;

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
    r = g = b = l; // achromatic
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

// Color harmony generation based on color wheel theory
export const generateColorHarmonies = (baseColor) => {
  const hsl = hexToHsl(baseColor);
  const { h, s, l } = hsl;

  return {
    monochromatic: generateMonochromatic(baseColor),
    analogous: generateAnalogous(h, s, l),
    complementary: generateComplementary(h, s, l),
    splitComplementary: generateSplitComplementary(h, s, l),
    triadic: generateTriadic(h, s, l),
    tetradic: generateTetradic(h, s, l),
    compound: generateCompound(h, s, l)
  };
};

const generateMonochromatic = (baseColor) => {
  const hsl = hexToHsl(baseColor);
  const variations = [];
  
  for (let i = 0; i < 5; i++) {
    const lightness = Math.max(10, Math.min(90, hsl.l + (i - 2) * 20));
    variations.push(hslToHex(hsl.h, hsl.s, lightness));
  }
  
  return variations;
};

const generateAnalogous = (h, s, l) => {
  return [
    hslToHex((h - 30 + 360) % 360, s, l),
    hslToHex(h, s, l),
    hslToHex((h + 30) % 360, s, l)
  ];
};

const generateComplementary = (h, s, l) => {
  return [
    hslToHex(h, s, l),
    hslToHex((h + 180) % 360, s, l)
  ];
};

const generateSplitComplementary = (h, s, l) => {
  return [
    hslToHex(h, s, l),
    hslToHex((h + 150) % 360, s, l),
    hslToHex((h + 210) % 360, s, l)
  ];
};

const generateTriadic = (h, s, l) => {
  return [
    hslToHex(h, s, l),
    hslToHex((h + 120) % 360, s, l),
    hslToHex((h + 240) % 360, s, l)
  ];
};

const generateTetradic = (h, s, l) => {
  return [
    hslToHex(h, s, l),
    hslToHex((h + 90) % 360, s, l),
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 270) % 360, s, l)
  ];
};

const generateCompound = (h, s, l) => {
  return [
    hslToHex(h, s, l),
    hslToHex((h + 30) % 360, s, l),
    hslToHex((h + 180) % 360, s, l),
    hslToHex((h + 210) % 360, s, l)
  ];
};

// Color psychology and emotional analysis
export const analyzeColorPsychology = (colors) => {
  const colorMeanings = {
    red: {
      emotions: ['passion', 'energy', 'urgency', 'excitement', 'danger'],
      industries: ['entertainment', 'food', 'emergency services', 'sports'],
      culturalNotes: 'Good fortune in China, mourning in South Africa',
      temperature: 'warm',
      energy: 'high',
      associations: ['love', 'power', 'anger', 'strength']
    },
    blue: {
      emotions: ['trust', 'calm', 'professionalism', 'security', 'stability'],
      industries: ['finance', 'healthcare', 'technology', 'corporate'],
      culturalNotes: 'Universal trust color, banking standard in Western cultures',
      temperature: 'cool',
      energy: 'low',
      associations: ['reliability', 'communication', 'wisdom', 'loyalty']
    },
    green: {
      emotions: ['nature', 'growth', 'harmony', 'freshness', 'prosperity'],
      industries: ['environmental', 'health', 'finance', 'organic products'],
      culturalNotes: 'Money color in Western cultures, nature universal',
      temperature: 'cool',
      energy: 'medium',
      associations: ['balance', 'renewal', 'safety', 'abundance']
    },
    yellow: {
      emotions: ['happiness', 'optimism', 'creativity', 'warning', 'energy'],
      industries: ['creative', 'children', 'food', 'transportation'],
      culturalNotes: 'Sadness in Greece, imperial color in China',
      temperature: 'warm',
      energy: 'high',
      associations: ['intellect', 'clarity', 'joy', 'caution']
    },
    purple: {
      emotions: ['luxury', 'creativity', 'mystery', 'nobility', 'spirituality'],
      industries: ['beauty', 'luxury', 'creative', 'wellness'],
      culturalNotes: 'Royalty traditionally, creativity in modern contexts',
      temperature: 'cool',
      energy: 'medium',
      associations: ['imagination', 'magic', 'sophistication', 'ambition']
    },
    orange: {
      emotions: ['enthusiasm', 'creativity', 'warmth', 'confidence', 'friendliness'],
      industries: ['sports', 'entertainment', 'technology', 'food'],
      culturalNotes: 'Least favorite among women generally',
      temperature: 'warm',
      energy: 'high',
      associations: ['adventure', 'youth', 'vitality', 'playfulness']
    },
    pink: {
      emotions: ['femininity', 'love', 'compassion', 'nurturing', 'playfulness'],
      industries: ['beauty', 'fashion', 'healthcare', 'children'],
      culturalNotes: 'Stereotypically feminine in Western cultures',
      temperature: 'warm',
      energy: 'medium',
      associations: ['care', 'sweetness', 'romance', 'gentleness']
    },
    brown: {
      emotions: ['earthiness', 'reliability', 'stability', 'wholesomeness'],
      industries: ['agriculture', 'construction', 'outdoor', 'organic'],
      culturalNotes: 'Most disliked by men, represents dependability',
      temperature: 'warm',
      energy: 'low',
      associations: ['nature', 'security', 'simplicity', 'durability']
    },
    black: {
      emotions: ['elegance', 'sophistication', 'power', 'mystery', 'formality'],
      industries: ['luxury', 'fashion', 'technology', 'corporate'],
      culturalNotes: 'Mourning in Western cultures, elegance universal',
      temperature: 'neutral',
      energy: 'low',
      associations: ['authority', 'prestige', 'timelessness', 'boldness']
    },
    white: {
      emotions: ['purity', 'cleanliness', 'simplicity', 'peace', 'innocence'],
      industries: ['healthcare', 'technology', 'minimalism', 'luxury'],
      culturalNotes: 'Mourning in some Asian cultures, purity in Western',
      temperature: 'neutral',
      energy: 'low',
      associations: ['clarity', 'space', 'modern', 'fresh']
    },
    gray: {
      emotions: ['neutrality', 'balance', 'sophistication', 'timelessness'],
      industries: ['corporate', 'technology', 'automotive', 'professional'],
      culturalNotes: 'Professional standard, can be warm or cool',
      temperature: 'neutral',
      energy: 'low',
      associations: ['stability', 'compromise', 'intelligence', 'maturity']
    }
  };

  return colors.map(color => {
    const hsl = hexToHsl(color);
    const dominantColor = getDominantColorName(hsl);
    const analysis = colorMeanings[dominantColor] || colorMeanings.gray;
    
    return {
      color,
      dominantColor,
      temperature: getColorTemperature(hsl),
      ...analysis,
      hsl,
      luminance: calculateLuminance(color),
      saturation: hsl.s,
      lightness: hsl.l
    };
  });
};

const getDominantColorName = (hsl) => {
  const { h, s, l } = hsl;
  
  if (s < 10) {
    if (l < 20) return 'black';
    if (l > 80) return 'white';
    return 'gray';
  }
  
  if (h >= 345 || h < 15) return 'red';
  if (h >= 15 && h < 45) return 'orange';
  if (h >= 45 && h < 75) return 'yellow';
  if (h >= 75 && h < 165) return 'green';
  if (h >= 165 && h < 225) return 'blue';
  if (h >= 225 && h < 285) return 'purple';
  if (h >= 285 && h < 345) return 'pink';
  
  return 'gray';
};

const getColorTemperature = (hsl) => {
  const { h } = hsl;
  
  if ((h >= 0 && h < 60) || (h >= 300 && h <= 360)) {
    return 'warm';
  } else if (h >= 180 && h < 300) {
    return 'cool';
  } else {
    return 'neutral';
  }
};

// Enhanced luminance calculation
export const calculateLuminance = (color) => {
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

// Color blindness simulation
export const simulateColorBlindness = (color, type) => {
  const rgb = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16)
  };

  let transformed;
  
  switch (type) {
    case 'protanopia': // Red-blind
      transformed = {
        r: 0.567 * rgb.r + 0.433 * rgb.g + 0 * rgb.b,
        g: 0.558 * rgb.r + 0.442 * rgb.g + 0 * rgb.b,
        b: 0 * rgb.r + 0.242 * rgb.g + 0.758 * rgb.b
      };
      break;
    case 'deuteranopia': // Green-blind
      transformed = {
        r: 0.625 * rgb.r + 0.375 * rgb.g + 0 * rgb.b,
        g: 0.7 * rgb.r + 0.3 * rgb.g + 0 * rgb.b,
        b: 0 * rgb.r + 0.3 * rgb.g + 0.7 * rgb.b
      };
      break;
    case 'tritanopia': // Blue-blind
      transformed = {
        r: 0.95 * rgb.r + 0.05 * rgb.g + 0 * rgb.b,
        g: 0 * rgb.r + 0.433 * rgb.g + 0.567 * rgb.b,
        b: 0 * rgb.r + 0.475 * rgb.g + 0.525 * rgb.b
      };
      break;
    default:
      return color;
  }

  const toHex = (c) => {
    const hex = Math.round(Math.max(0, Math.min(255, c))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(transformed.r)}${toHex(transformed.g)}${toHex(transformed.b)}`;
};

// Intelligent color suggestions based on analysis
export const generateColorSuggestions = (palette) => {
  const analysis = analyzeColorPsychology(Object.values(palette));
  const suggestions = [];

  // --- Globally-Aware, Atomic Contrast Fixer ---
  let workingPalette = { ...palette };
  let prevPalette;
  let maxTries = 8;
  let allFixes = [];
  let fixed = false;
  let lastFailures = Infinity;
  let attemptedPairs = new Set();
  do {
    prevPalette = { ...workingPalette };
    // Build contrast matrix for all pairs
    const pairs = [];
    const textRoles = ['text', 'textSecondary'];
    const bgRoles = ['background', 'surface', 'primary', 'secondary', 'accent', 'success', 'warning', 'error'];
    textRoles.forEach(textRole => {
      bgRoles.forEach(bgRole => {
        if (workingPalette[textRole] && workingPalette[bgRole] && workingPalette[textRole] !== workingPalette[bgRole]) {
          const ratio = calculateContrast(workingPalette[textRole], workingPalette[bgRole]);
          pairs.push({
            textRole,
            bgRole,
            textColor: workingPalette[textRole],
            bgColor: workingPalette[bgRole],
            ratio
          });
        }
      });
    });
    // Find all failing pairs
    const failing = pairs.filter(p => p.ratio < 4.5 && !attemptedPairs.has(`${p.textRole}|${p.bgRole}`));
    if (failing.length === 0) { fixed = true; break; }
    if (failing.length >= lastFailures) break; // No improvement, stop
    lastFailures = failing.length;
    let roundFixes = [];
    let bestFix = null;
    let bestPalette = null;
    let bestFailCount = failing.length;
    // Try all possible fixes for each failing pair, pick the one that reduces failures the most
    for (let pair of failing) {
      const { textRole, bgRole, textColor, bgColor, ratio } = pair;
      attemptedPairs.add(`${textRole}|${bgRole}`);
      // Try black/white for text
      ["#000000", "#ffffff"].forEach(candidate => {
        if (workingPalette[textRole] !== candidate) {
          let testPalette = { ...workingPalette, [textRole]: candidate };
          let failCount = 0;
          textRoles.forEach(tr => {
            bgRoles.forEach(br => {
              if (testPalette[tr] && testPalette[br] && testPalette[tr] !== testPalette[br]) {
                const r = calculateContrast(testPalette[tr], testPalette[br]);
                if (r < 4.5) failCount++;
              }
            });
          });
          if (failCount < bestFailCount) {
            bestFailCount = failCount;
            bestFix = {
              problem: `${textColor} on ${bgColor} has ratio ${ratio.toFixed(2)}`,
              solution: `Change ${textRole} to ${candidate} for contrast ratio ${calculateContrast(candidate, bgColor).toFixed(2)}`,
              role: textRole,
              color: candidate
            };
            bestPalette = { ...testPalette };
          }
        }
      });
      // Try lightening/darkening text
      let hsl = hexToHsl(textColor);
      for (let i = 1; i <= 10; i++) {
        let l = hsl.l < 50 ? hsl.l + i * 7 : hsl.l - i * 7;
        if (l > 100) l = 100;
        if (l < 0) l = 0;
        let newHex = hslToHex(hsl.h, hsl.s, l);
        let testPalette = { ...workingPalette, [textRole]: newHex };
        let failCount = 0;
        textRoles.forEach(tr => {
          bgRoles.forEach(br => {
            if (testPalette[tr] && testPalette[br] && testPalette[tr] !== testPalette[br]) {
              const r = calculateContrast(testPalette[tr], testPalette[br]);
              if (r < 4.5) failCount++;
            }
          });
        });
        if (failCount < bestFailCount) {
          bestFailCount = failCount;
          bestFix = {
            problem: `${textColor} on ${bgColor} has ratio ${ratio.toFixed(2)}`,
            solution: `Change ${textRole} to ${newHex} for improved contrast` ,
            role: textRole,
            color: newHex
          };
          bestPalette = { ...testPalette };
        }
      }
      // Try lightening/darkening background
      let hslBg = hexToHsl(bgColor);
      for (let i = 1; i <= 10; i++) {
        let l = hslBg.l < 50 ? hslBg.l + i * 7 : hslBg.l - i * 7;
        if (l > 100) l = 100;
        if (l < 0) l = 0;
        let newHex = hslToHex(hslBg.h, hslBg.s, l);
        let testPalette = { ...workingPalette, [bgRole]: newHex };
        let failCount = 0;
        textRoles.forEach(tr => {
          bgRoles.forEach(br => {
            if (testPalette[tr] && testPalette[br] && testPalette[tr] !== testPalette[br]) {
              const r = calculateContrast(testPalette[tr], testPalette[br]);
              if (r < 4.5) failCount++;
            }
          });
        });
        if (failCount < bestFailCount) {
          bestFailCount = failCount;
          bestFix = {
            problem: `${textColor} on ${bgColor} has ratio ${ratio.toFixed(2)}`,
            solution: `Change ${bgRole} to ${newHex} for improved contrast`,
            role: bgRole,
            color: newHex
          };
          bestPalette = { ...testPalette };
        }
      }
    }
    if (bestFix && bestFailCount < failing.length) {
      workingPalette = { ...bestPalette };
      roundFixes.push(bestFix);
    } else {
      // No improvement possible this round
      break;
    }
    allFixes = allFixes.concat(roundFixes);
    maxTries--;
  } while (!fixed && maxTries > 0 && JSON.stringify(prevPalette) !== JSON.stringify(workingPalette));

  // Report unfixable pairs
  const finalPairs = [];
  const textRoles = ['text', 'textSecondary'];
  const bgRoles = ['background', 'surface', 'primary', 'secondary', 'accent', 'success', 'warning', 'error'];
  textRoles.forEach(textRole => {
    bgRoles.forEach(bgRole => {
      if (workingPalette[textRole] && workingPalette[bgRole] && workingPalette[textRole] !== workingPalette[bgRole]) {
        const ratio = calculateContrast(workingPalette[textRole], workingPalette[bgRole]);
        if (ratio < 4.5) {
          finalPairs.push({ textRole, bgRole, textColor: workingPalette[textRole], bgColor: workingPalette[bgRole], ratio });
        }
      }
    });
  });
  if (allFixes.length > 0) {
    suggestions.push({
      type: 'contrast',
      severity: finalPairs.length === 0 ? 'low' : 'high',
      title: finalPairs.length === 0 ? 'All Contrast Issues Fixed' : 'Contrast Issues Detected',
      description: finalPairs.length === 0 ? 'All color combinations now pass WCAG AA.' : 'Some color combinations could not be fixed automatically.',
      fixes: allFixes.concat(finalPairs.map(pair => ({
        problem: `${pair.textColor} on ${pair.bgColor} has ratio ${pair.ratio.toFixed(2)}`,
        solution: `Manual adjustment needed to reach 4.5:1 contrast for ${pair.textRole} on ${pair.bgRole}`
      })))
    });
  }

  // Color harmony suggestions
  const harmonyAnalysis = analyzeColorHarmony(palette);
  if (harmonyAnalysis.improvementNeeded) {
    suggestions.push({
      type: 'harmony',
      severity: 'medium',
      title: 'Color Harmony Enhancement',
      description: 'Palette could benefit from better color relationships',
      fixes: harmonyAnalysis.suggestions
    });
  }

  // Psychological impact suggestions
  const psychAnalysis = analyzePsychologicalImpact(analysis);
  if (psychAnalysis.warnings.length > 0) {
    suggestions.push({
      type: 'psychology',
      severity: 'low',
      title: 'Psychological Impact Considerations',
      description: 'Consider emotional and cultural implications',
      fixes: psychAnalysis.warnings
    });
  }

  return suggestions;
};

const findContrastIssues = (palette) => {
  const issues = [];
  const textColors = [palette.text, palette.textSecondary];
  const backgroundColors = [palette.background, palette.surface, palette.primary, palette.secondary];

  textColors.forEach(textColor => {
    if (!textColor) return;
    backgroundColors.forEach(bgColor => {
      if (!bgColor || textColor === bgColor) return;
      
      const contrast = calculateContrast(textColor, bgColor);
      if (contrast < 4.5) {
        issues.push({
          pair: `${textColor} on ${bgColor}`,
          ratio: contrast,
          textColor,
          bgColor
        });
      }
    });
  });

  return issues;
};

const calculateContrast = (color1, color2) => {
  const l1 = calculateLuminance(color1);
  const l2 = calculateLuminance(color2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const analyzeColorHarmony = (palette) => {
  const colors = Object.values(palette).filter(Boolean);
  const harmonies = colors.map(color => generateColorHarmonies(color));
  
  // Check if current palette follows any harmony rules
  const followsHarmony = harmonies.some(harmony => 
    Object.values(harmony).some(scheme => 
      scheme.every(harmonyColor => 
        colors.some(paletteColor => 
          calculateContrast(harmonyColor, paletteColor) > 0.9
        )
      )
    )
  );

  return {
    improvementNeeded: !followsHarmony,
    suggestions: followsHarmony ? [] : [
      'Consider using analogous colors for a more harmonious palette',
      'Try complementary colors for high contrast and vibrancy',
      'Monochromatic schemes work well for minimal designs'
    ]
  };
};

const analyzePsychologicalImpact = (colorAnalysis) => {
  const warnings = [];
  const temperatureCount = { warm: 0, cool: 0, neutral: 0 };
  
  colorAnalysis.forEach(analysis => {
    temperatureCount[analysis.temperature]++;
  });

  if (temperatureCount.warm > temperatureCount.cool * 2) {
    warnings.push('Predominantly warm colors may feel overwhelming - consider adding cool colors for balance');
  }
  
  if (temperatureCount.cool > temperatureCount.warm * 2) {
    warnings.push('Predominantly cool colors may feel distant - consider adding warm accents for engagement');
  }

  return { warnings };
};
