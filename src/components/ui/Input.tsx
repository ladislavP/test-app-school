import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, rightIcon, variant = 'default', type, ...props }, ref) => {
    const variants = {
      default: 'input-modern',
      filled: 'w-full py-3 rounded-xl border-0 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500',
      outlined: 'w-full py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500'
    };

    // Calculate padding based on icons
    const getPadding = () => {
      const leftPadding = icon ? 'pl-14' : 'pl-4'; // Increased from pl-12 to pl-14 for better spacing
      const rightPadding = rightIcon ? 'pr-14' : 'pr-4'; // Increased from pr-12 to pr-14 for better spacing
      return `${leftPadding} ${rightPadding}`;
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="label-modern">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10 pointer-events-none">
              {icon}
            </div>
          )}
          {rightIcon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10 pointer-events-none">
              {rightIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              variants[variant],
              getPadding(),
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              'animate-fade-in',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 animate-slide-up">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Search Input Component
const SearchInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'icon'>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
        placeholder="Hľadať..."
        className={className}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="label-modern">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 resize-none',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            'animate-fade-in',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 animate-slide-up">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, SearchInput, Textarea };

