import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-primary-50 hover:bg-primary-600',
        secondary: 'bg-secondary-700 text-secondary-50 hover:bg-secondary-600',
        outline: 'text-secondary-950 border border-secondary-200 dark:border-secondary-800 dark:text-secondary-50',
        success: 'bg-success-500 text-white',
        warning: 'bg-warning-500 text-white',
        error: 'bg-error-500 text-white',
      },
      priority: {
        low: 'bg-green-500 text-white',
        medium: 'bg-warning-500 text-white',
        high: 'bg-error-500 text-white',
      },
      category: {
        work: 'bg-blue-500 text-white',
        personal: 'bg-purple-500 text-white',
        health: 'bg-green-500 text-white',
        learning: 'bg-yellow-500 text-black',
        other: 'bg-gray-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ 
  className, 
  variant, 
  priority,
  category,
  ...props 
}: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant, priority, category }), className)} 
      {...props} 
    />
  );
}

export { Badge, badgeVariants };