import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glass?: boolean;
}

export function Card({ 
  children, 
  className, 
  glass = false,
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl shadow-md overflow-hidden',
        glass 
          ? 'backdrop-blur-md bg-white/10 dark:bg-secondary-800/30 border border-white/20 dark:border-secondary-700/30' 
          : 'bg-white dark:bg-secondary-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ 
  children, 
  className, 
  ...props 
}: CardHeaderProps) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ 
  children, 
  className, 
  ...props 
}: CardContentProps) {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ 
  children, 
  className, 
  ...props 
}: CardFooterProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-gray-200 dark:border-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  );
}