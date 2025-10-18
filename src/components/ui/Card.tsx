import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export function Card({ className, onClick, children }: CardProps) {
  return (
    <div
      className={clsx('bg-slate-800 rounded-lg shadow-lg p-6', onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
