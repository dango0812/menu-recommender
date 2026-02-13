'use client';

import { type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind-merge';

const inputVariants = cva(
  `rounded-2xl border border-gray-200 bg-white py-3.5 pr-4 pl-10 text-sm placeholder-gray-400 shadow-sm transition-all
  duration-200 focus:border-primary focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100
  disabled:text-gray-500`,
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: 'w-max',
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }
);

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputVariants> & {
    ref?: Ref<HTMLInputElement>;
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
    fullWidth?: boolean;
  };

/**
 * Render a styled input with optional start/end decorators and optional full-width layout.
 *
 * Renders an input element wrapped in a positioned container; when provided, `startDecorator` and
 * `endDecorator` are placed inside the input wrapper at the left and right edges respectively.
 *
 * @param ref - Forwarded ref for the underlying input element
 * @param className - Additional class names applied to the input element
 * @param startDecorator - Element rendered at the left side inside the input wrapper (e.g., icon)
 * @param endDecorator - Element rendered at the right side inside the input wrapper (e.g., icon)
 * @param fullWidth - If `true`, the container and input expand to fill available horizontal space
 * @returns The rendered input element
 *
 * @example
 * ```tsx
 * <Input placeholder="Search…" />
 * <Input fullWidth placeholder="Full width" />
 * <Input startDecorator={<SearchIcon />} placeholder="Search" />
 * ```
 */
export function Input({ ref, className, startDecorator, endDecorator, fullWidth, ...props }: InputProps) {
  return (
    <div className={cn('relative inline-flex items-center', fullWidth && 'w-full')}>
      {startDecorator && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-current">
          {startDecorator}
        </div>
      )}

      <input
        ref={ref}
        className={cn(
          inputVariants({ fullWidth }),
          startDecorator ? 'pl-12' : 'pl-4',
          endDecorator ? 'pr-12' : 'pr-4',
          className
        )}
        {...props}
      />

      {endDecorator && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">{endDecorator}</div>
      )}
    </div>
  );
}