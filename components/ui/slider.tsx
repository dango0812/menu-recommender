'use client';

import { useCallback } from 'react';

import { cn } from '@/lib/tailwind-merge';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}

/**
 * Slider 컴포넌트
 * @example
 * ```tsx
 * <Slider min={1} max={5} step={1} value={count} onChange={setCount} />
 * ```
 */
export function Slider({ min = 0, max = 100, step = 1, value, onChange, className, ...props }: SliderProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className={cn('ui-slider w-full', className)}
      {...props}
    />
  );
}
