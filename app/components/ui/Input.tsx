'use client';

import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  disabled = false,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {label}
          {props.required && <span className="text-burgundy ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 bg-ivory/90 border-2 border-cream-dark rounded-lg
          text-charcoal placeholder-brown/50 transition-all duration-300
          focus:border-sage focus:shadow-soft focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-error' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
      {helperText && <p className="text-gray-400 text-sm mt-1">{helperText}</p>}
    </div>
  );
}
