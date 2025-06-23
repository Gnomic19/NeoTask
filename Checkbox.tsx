import React from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className="peer absolute h-4 w-4 cursor-pointer opacity-0"
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            'flex h-4 w-4 items-center justify-center rounded border border-secondary-300',
            'dark:border-secondary-700 transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2',
            'peer-checked:bg-primary-500 peer-checked:border-primary-500',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
            className
          )}
        >
          <Check className="h-3 w-3 text-white peer-checked:opacity-100 opacity-0 transition-opacity" />
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };