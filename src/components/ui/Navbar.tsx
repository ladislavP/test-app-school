import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  rightContent?: React.ReactNode;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, title, showBackButton = false, onBackClick, rightContent, ...props }, ref) => {
    return (
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-14 px-4 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="mr-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        {rightContent && <div>{rightContent}</div>}
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export { Navbar };
