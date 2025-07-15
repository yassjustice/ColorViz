import React from 'react';

export default function Input({ icon: Icon, label, error, success, className = '', ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-dynamic-text">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dynamic-text-secondary" />}
        <input
          className={`w-full px-4 py-2.5 ${Icon ? 'pl-10' : ''} border rounded-lg bg-dynamic-background text-dynamic-text placeholder-dynamic-text-secondary focus:outline-none focus:ring-2 transition-all duration-200 ${error ? 'border-dynamic-error focus:ring-dynamic-error/20' : success ? 'border-dynamic-success focus:ring-dynamic-success/20' : 'border-dynamic-border focus:ring-dynamic-primary/20 focus:border-dynamic-primary'} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-dynamic-error flex items-center gap-1"><span>!</span>{error}</p>}
      {success && <p className="text-sm text-dynamic-success flex items-center gap-1"><span>✓</span>{success}</p>}
    </div>
  );
}
