import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showValue?: boolean;
  size?: 'sm' | 'default' | 'lg';
  label?: string;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  showValue = false,
  size = 'default',
  label,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-secondary-600 dark:text-secondary-400">{label}</span>}
          {showValue && <span className="text-xs font-medium text-secondary-600 dark:text-secondary-400">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out rounded-full bg-gradient-to-r from-primary-400 to-accent-500", 
            sizeClasses[size],
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}