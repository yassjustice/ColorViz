import React from 'react';
import { Check, AlertCircle, X, Info } from 'lucide-react';

export default function Alert({ children, variant = 'info', className = '' }) {
  const variants = {
    success: 'bg-dynamic-success/10 border-dynamic-success text-dynamic-success',
    warning: 'bg-dynamic-warning/10 border-dynamic-warning text-dynamic-warning',
    error: 'bg-dynamic-error/10 border-dynamic-error text-dynamic-error',
    info: 'bg-dynamic-primary/10 border-dynamic-primary text-dynamic-primary'
  };
  const icons = {
    success: Check,
    warning: AlertCircle,
    error: X,
    info: Info
  };
  const Icon = icons[variant];
  return (
    <div className={`p-4 border rounded-lg flex items-start gap-3 ${variants[variant]} ${className}`}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
