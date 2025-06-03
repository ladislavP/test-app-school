import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated' | 'outlined';
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', hover = true, ...props }, ref) => {
    const variants = {
      default: 'modern-card',
      glass: 'glass-card',
      elevated: 'bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden',
      outlined: 'bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600 overflow-hidden'
    };

    return (
      <div
        className={cn(
          variants[variant],
          hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
          'animate-fade-in',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white",
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 dark:text-gray-400 leading-relaxed", className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between p-6 pt-0 bg-gray-50 dark:bg-gray-800/50", className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

// New modern card variants
const FeatureCard = React.forwardRef<
  HTMLDivElement,
  CardProps & { icon?: React.ReactNode; title: string; description: string }
>(({ className, icon, title, description, children, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("group cursor-pointer", className)}
    {...props}
  >
    <CardContent className="p-6">
      {icon && (
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
      {children}
    </CardContent>
  </Card>
));

FeatureCard.displayName = 'FeatureCard';

const StatsCard = React.forwardRef<
  HTMLDivElement,
  Omit<CardProps, 'children'> & { 
    value: string; 
    label: string; 
    trend?: 'up' | 'down' | 'neutral'; 
    trendValue?: string;
    children?: React.ReactNode;
  }
>(({ className, value, label, trend, trendValue, children, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("text-center", className)}
    {...props}
  >
    <CardContent className="p-6">
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</div>
      {trend && trendValue && (
        <div className={cn(
          "text-xs font-semibold",
          trend === 'up' && "text-emerald-600",
          trend === 'down' && "text-red-600",
          trend === 'neutral' && "text-gray-600"
        )}>
          {trend === 'up' && '↗'} {trend === 'down' && '↘'} {trendValue}
        </div>
      )}
      {children}
    </CardContent>
  </Card>
));

StatsCard.displayName = 'StatsCard';

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  FeatureCard,
  StatsCard
};

