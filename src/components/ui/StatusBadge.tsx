import React from 'react';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';

interface StatusBadgeProps {
  status: 'green' | 'yellow' | 'red' | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  className,
  size = 'md'
}) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'green':
        return {
          label: t('status.healthy'),
          className: 'status-green'
        };
      case 'yellow':
        return {
          label: t('status.warning'),
          className: 'status-yellow'
        };
      case 'red':
        return {
          label: t('status.critical'),
          className: 'status-red'
        };
      default:
        return {
          label: status,
          className: 'status-badge bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
        };
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  const config = getStatusConfig(status);

  return (
    <span className={cn(
      'status-badge',
      config.className,
      sizeClasses[size],
      className
    )}>
      {config.label}
    </span>
  );
};

export { StatusBadge };

