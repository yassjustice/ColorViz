import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ value, max = 100, color = 'primary', className = '' }) {
  const percentage = Math.min(100, (value / max) * 100);
  const colors = {
    primary: 'bg-dynamic-primary',
    secondary: 'bg-dynamic-secondary',
    success: 'bg-dynamic-success',
    warning: 'bg-dynamic-warning',
    error: 'bg-dynamic-error'
  };
  return (
    <div className={`w-full bg-dynamic-border rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${colors[color]} rounded-full`}
      />
    </div>
  );
}
