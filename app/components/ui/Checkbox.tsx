'use client';

import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Checkbox({
  label,
  error,
  className = '',
  disabled = false,
  ...props
}: CheckboxProps) {
  return (
    <div className="flex items-start">
      <input
        type="checkbox"
        className={`
          w-5 h-5 mt-1 rounded bg-dark-charcoal border-2 border-dark-slate
          text-neon-pink cursor-pointer transition-all duration-300
          focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-error' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      />
      <label className={`ml-3 text-sm font-medium text-gray-200 cursor-pointer ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </label>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
}
