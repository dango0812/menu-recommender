'use client';

import { type InputHTMLAttributes, type ReactNode, type Ref } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind-merge';

const inputVariants = cva(
  `rounded-2xl border border-gray-200 bg-white py-3.5 pr-4 pl-10 text-sm placeholder-gray-400 shadow-sm transition-all
  duration-200 focus:border-gray-300 focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100
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
 * Input 컴포넌트
 * @example
 * ```tsx
 * <Input placeholder="검색어를 입력하세요" />
 * <Input fullWidth placeholder="전체 너비" />
 * <Input startDecorator={<Search />} placeholder="검색" />
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
