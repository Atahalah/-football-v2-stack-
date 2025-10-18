import { ReactNode, ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'default' | 'ghost';
  size?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-slate-700 text-white hover:bg-slate-600',
        variant === 'outline' && 'border border-slate-600 text-white hover:bg-slate-700',
        variant === 'default' && 'bg-slate-700 text-white hover:bg-slate-600',
        variant === 'ghost' && 'hover:bg-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
