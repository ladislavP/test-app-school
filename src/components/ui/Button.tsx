import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
  {
    variants: {
      variant: {
        default: 'btn-primary',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        success: 'btn-success',
        destructive: 'btn-danger',
        danger: 'btn-danger',
        outline: 'btn-outline',
        ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:-translate-y-0.5',
        link: 'text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline bg-transparent p-0 h-auto',
      },
      size: {
        default: 'px-6 py-3 text-base rounded-xl',
        sm: 'px-3 py-2 text-sm rounded-lg',
        lg: 'px-8 py-4 text-lg rounded-xl',
        xl: 'px-10 py-5 text-xl rounded-2xl',
        icon: 'h-10 w-10 p-0 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, icon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="spinner w-4 h-4 mr-2" />
            Loading...
          </>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

