import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'white' | 'gray';
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  className,
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-gray-200 border-t-indigo-600',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-300 border-t-gray-600'
  };

  return (
    <div className={cn(
      'spinner',
      sizeClasses[size],
      colorClasses[color],
      className
    )} />
  );
};

// Loading component with spinner and text
interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  text = 'Loading...', 
  size = 'md',
  className 
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
      <Spinner size={size} />
      <p className="text-gray-500 dark:text-gray-400 text-sm">{text}</p>
    </div>
  );
};

export { Spinner, Loading };

