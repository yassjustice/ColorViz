import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ variant = 'primary', size = 'md', children, className = '', disabled = false, loading = false, ...props }) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2 relative overflow-hidden';
  const variants = {
    primary: 'bg-dynamic-primary text-white hover:opacity-90 shadow-sm disabled:opacity-50',
    secondary: 'bg-dynamic-secondary text-white hover:opacity-90 shadow-sm disabled:opacity-50',
    accent: 'bg-dynamic-accent text-white hover:opacity-90 shadow-sm disabled:opacity-50',
    outline: 'border-2 border-dynamic-primary text-dynamic-primary hover:bg-dynamic-primary hover:text-white disabled:opacity-50',
    ghost: 'text-dynamic-primary hover:bg-dynamic-primary/10 disabled:opacity-50',
    success: 'bg-dynamic-success text-white hover:opacity-90 disabled:opacity-50',
    warning: 'bg-dynamic-warning text-white hover:opacity-90 disabled:opacity-50',
    error: 'bg-dynamic-error text-white hover:opacity-90 disabled:opacity-50',
    gradient: 'bg-gradient-to-r from-dynamic-primary to-dynamic-secondary text-white hover:from-dynamic-primary/90 hover:to-dynamic-secondary/90 shadow-lg'
  };
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {!loading && children}
    </motion.button>
  );
}
