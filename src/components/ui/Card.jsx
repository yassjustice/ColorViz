import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, featured = false, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`bg-dynamic-surface border ${featured ? 'border-dynamic-primary shadow-dynamic-primary/20' : 'border-dynamic-border'} rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
