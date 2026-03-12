'use client';

import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/tailwind-merge';

const buttonVariants = cva(
  `relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-2xl font-bold transition-colors
  disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-700 disabled:opacity-50`,
  {
    variants: {
      color: {
        primary: 'bg-primary text-white hover:bg-orange-500 active:bg-orange-500',
        danger: 'bg-error text-white hover:bg-red-500 active:bg-red-500',
        gray: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-300',
        light: 'bg-white text-gray-900 hover:bg-gray-200 active:bg-gray-200',
      },
      size: {
        sm: 'h-11 px-3 text-xs',
        md: 'h-12 px-4 text-sm',
        lg: 'h-14 px-5 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-max',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'md',
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  children?: ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
  fullWidth?: boolean;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    as?: 'button';
    ref?: Ref<HTMLButtonElement>;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> & {
    as: 'a';
    ref?: Ref<HTMLAnchorElement>;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Button 컴포넌트
 * @example
 * ```tsx
 * <Button color="primary" size="md">확인</Button>
 * <Button as="a" href="/home" color="danger">링크</Button>
 * <Button loading>로딩</Button>
 * ```
 */
export function Button({
  as = 'button',
  ref,
  children,
  className,
  color,
  size,
  loading,
  disabled,
  startDecorator,
  endDecorator,
  fullWidth,
  ...props
}: ButtonProps) {
  if (as === 'a') {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={cn(buttonVariants({ color, size, fullWidth }), className)}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {startDecorator}
        {children}
        {endDecorator}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      className={cn(buttonVariants({ color, size, fullWidth }), className)}
      disabled={disabled || loading}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {loading && <Loader2 className="absolute animate-spin" />}
      <span className={cn('inline-flex items-center gap-3', loading && 'invisible')}>
        {startDecorator}
        {children}
        {endDecorator}
      </span>
    </button>
  );
}
