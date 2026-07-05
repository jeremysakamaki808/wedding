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
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {label}
          {props.required && <span className="text-burgundy ml-1">*</span>}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 bg-ivory/90 border-2 border-cream-dark rounded-lg
          text-charcoal placeholder-brown/50 transition-all duration-300
          focus:border-sage focus:shadow-soft focus:outline-none
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
