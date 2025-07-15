import React from 'react';

export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const variants = {
    default: 'bg-dynamic-primary/10 text-dynamic-primary',
    secondary: 'bg-dynamic-secondary/10 text-dynamic-secondary',
    accent: 'bg-dynamic-accent/10 text-dynamic-accent',
    success: 'bg-dynamic-success/10 text-dynamic-success',
    warning: 'bg-dynamic-warning/10 text-dynamic-warning',
    error: 'bg-dynamic-error/10 text-dynamic-error',
    neutral: 'bg-dynamic-border text-dynamic-text-secondary',
    primary: 'bg-dynamic-primary text-white'
  };
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
