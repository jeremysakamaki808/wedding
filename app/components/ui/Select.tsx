'use client';

import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: string[];
}

export default function Select({
  label,
  error,
  helperText,
  options,
  className = '',
  disabled = false,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          {label}
          {props.required && <span className="text-neon-pink ml-1">*</span>}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 bg-dark-charcoal border-2 border-dark-slate rounded-lg
          text-white placeholder-gray-500 transition-all duration-300
          focus:border-neon-cyan focus:shadow-glow-cyan focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none
          ${error ? 'border-error' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        <option value="">Select an option...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-400 text-sm mt-1">{helperText}</p>}
    </div>
  );
}
