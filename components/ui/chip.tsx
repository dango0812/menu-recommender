'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind';
const chipVariants = cva(
  `inline-flex cursor-pointer items-center justify-center rounded-full font-medium whitespace-nowrap
  disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      color: {
        primary: 'bg-primary text-white active:bg-orange-600',
        danger: 'bg-error text-white active:bg-red-500',
        gray: 'bg-gray-200 text-gray-800 active:bg-gray-300',
        light: 'border border-gray-200 bg-white text-gray-500 active:border-gray-300',
      },
      size: {
        sm: 'h-7 px-3 text-xs',
        md: 'h-9 px-4 text-sm',
        lg: 'h-11 px-5 text-base',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  }
);

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof chipVariants> {
  children: ReactNode;
  className?: string;
}

/**
 * Chip 컴포넌트
 * @example
 * ```tsx
 * <Chip color="primary" size="sm">
 *   Example Chip
 * </Chip>
 * ```
 */
export function Chip({ children, color, size, className, disabled, ...props }: ChipProps) {
  return (
    <button type="button" disabled={disabled} className={cn(chipVariants({ color, size }), className)} {...props}>
      {children}
    </button>
  );
}
