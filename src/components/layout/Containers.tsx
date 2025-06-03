import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<LayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "min-h-screen w-full mx-auto pt-14 pb-4 px-4",
      className
    )}>
      {children}
    </div>
  );
};

export const ContentContainer: React.FC<LayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "w-full py-4 space-y-4",
      className
    )}>
      {children}
    </div>
  );
};

export const BottomFixedContainer: React.FC<LayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800",
      className
    )}>
      <div className="max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};
