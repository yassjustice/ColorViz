import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { calculateContrast } from '../utils/colorTheory';

export const QuickStats = () => {
  const { currentPalette } = useTheme();

  // Count palette colors
  const colorCount = Object.values(currentPalette).filter(Boolean).length;

  // Define contrast tests (same as ColorAnalysis)
  const contrastTests = useMemo(() => [
    { bg: currentPalette.primary, text: '#ffffff' },
    { bg: currentPalette.primary, text: currentPalette.text },
    { bg: currentPalette.secondary, text: '#ffffff' },
    { bg: currentPalette.background, text: currentPalette.text },
    { bg: currentPalette.surface, text: currentPalette.text },
    { bg: currentPalette.accent, text: '#ffffff' },
  ], [currentPalette]);

  // Calculate AA compliance
  const aaCompliant = contrastTests.filter(test => {
    if (!test.bg || !test.text) return false;
    const ratio = calculateContrast(test.bg, test.text);
    return ratio >= 4.5;
  }).length;

  return (
    <div className="mt-8 p-4 bg-dynamic-background rounded-lg border border-dynamic-border">
      <h3 className="text-sm font-semibold text-dynamic-text mb-3">Quick Stats</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-dynamic-text-secondary">Colors</span>
          <span className="text-dynamic-text font-medium">{colorCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-dynamic-text-secondary">Contrast Tests</span>
          <span className="text-dynamic-text font-medium">{contrastTests.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-dynamic-text-secondary">AA Compliant</span>
          <span className="text-green-600 font-medium">{aaCompliant}/{contrastTests.length}</span>
        </div>
      </div>
    </div>
  );
};
