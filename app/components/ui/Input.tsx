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
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          {label}
          {props.required && <span className="text-neon-pink ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 bg-dark-charcoal border-2 border-dark-slate rounded-lg
          text-white placeholder-gray-500 transition-all duration-300
          focus:border-neon-cyan focus:shadow-glow-cyan focus:outline-none
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
