'use client';

import React, { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

export default function Textarea({
  label,
  error,
  helperText,
  maxLength,
  className = '',
  disabled = false,
  value = '',
  ...props
}: TextareaProps) {
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-charcoal mb-2">
          {label}
          {props.required && <span className="text-burgundy ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 bg-ivory/90 border-2 border-cream-dark rounded-lg
          text-charcoal placeholder-brown/50 transition-all duration-300
          focus:border-sage focus:shadow-soft focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed resize-vertical min-h-[120px]
          ${error ? 'border-error' : ''}
          ${className}
        `}
        disabled={disabled}
        value={value}
        maxLength={maxLength}
        {...props}
      />
      <div className="flex justify-between items-end mt-1">
        <div>
          {error && <p className="text-error text-sm">{error}</p>}
          {helperText && <p className="text-gray-400 text-sm">{helperText}</p>}
        </div>
        {maxLength && (
          <p className={`text-sm ${charCount > maxLength * 0.9 ? 'text-warning' : 'text-brown/50'}`}>
            {charCount} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
