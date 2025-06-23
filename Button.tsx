import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-secondary-700 text-white hover:bg-secondary-600',
        outline: 'border border-input bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800',
        ghost: 'hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:text-accent-600',
        link: 'text-primary-500 underline-offset-4 hover:underline',
        glass: 'backdrop-blur-sm bg-white/10 dark:bg-black/10 border border-white/20 dark:border-secondary-700/30 hover:bg-white/20 dark:hover:bg-black/20',
        success: 'bg-success-500 text-white hover:bg-success-600',
        warning: 'bg-warning-500 text-white hover:bg-warning-600',
        error: 'bg-error-500 text-white hover:bg-error-600',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
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
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };