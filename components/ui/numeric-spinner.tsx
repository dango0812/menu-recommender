'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind-merge';

const spinnerContainer = cva('inline-flex items-center gap-3 rounded-full bg-spinner p-1 shadow-sm', {
  variants: {
    fullWidth: {
      true: 'w-full justify-between',
      false: 'w-max',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

const spinnerNumber = cva('text-center font-bold tabular-nums select-none', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const spinnerButton = cva(
  `flex cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 transition-colors
  hover:bg-gray-200 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      size: {
        sm: 'h-7 w-7 text-base',
        md: 'h-8 w-8 text-lg',
        lg: 'h-9 w-9 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface NumericSpinnerProps {
  size?: NonNullable<VariantProps<typeof spinnerButton>['size']>;
  number?: number;
  minNumber?: number;
  maxNumber?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  onNumberChange?: (number: number) => void;
  className?: string;
}

/**
 * NumericSpinner 컴포넌트
 * @example
 * ```tsx
 * <NumericSpinner
 *   number={quantity}
 *   onNumberChange={handleQuantityChange}
 *   minNumber={1}
 *   maxNumber={10}
 *   size="md"
 * />
 * ```
 */
export function NumericSpinner({
  size = 'md',
  number = 0,
  minNumber = 0,
  maxNumber = Infinity,
  disabled = false,
  fullWidth = false,
  onNumberChange,
  className,
}: NumericSpinnerProps) {
  const decrement = Boolean(onNumberChange) && !disabled && number > minNumber;
  const increment = Boolean(onNumberChange) && !disabled && number < maxNumber;

  const handleDecrement = () => {
    if (!decrement) {
      return;
    }

    onNumberChange?.(number - 1);
  };

  const handleIncrement = () => {
    if (!increment) {
      return;
    }

    onNumberChange?.(number + 1);
  };

  return (
    <div className={cn(spinnerContainer({ fullWidth }), className)}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={!decrement}
        aria-label="감소"
        className={spinnerButton({ size })}
      >
        -
      </button>
      <span className={spinnerNumber({ size })} aria-live="polite" aria-atomic="true">
        {number}
      </span>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={!increment}
        aria-label="증가"
        className={spinnerButton({ size })}
      >
        +
      </button>
    </div>
  );
}
