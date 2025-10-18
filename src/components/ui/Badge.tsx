import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  className?: string;
  size?: string;
  children: ReactNode;
}

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-slate-700 text-slate-200',
        variant === 'success' && 'bg-green-700 text-green-100',
        variant === 'warning' && 'bg-yellow-700 text-yellow-100',
        variant === 'error' && 'bg-red-700 text-red-100',
        variant === 'info' && 'bg-blue-700 text-blue-100',
        variant === 'outline' && 'border border-slate-600 text-slate-200',
        className
      )}
    >
      {children}
    </span>
  );
}
