'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind';

const switchTrack = cva(
  `inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors
  duration-200 disabled:cursor-not-allowed disabled:opacity-50`,
  {
    variants: {
      checked: {
        true: 'bg-primary',
        false: 'bg-gray-200',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-8 w-14',
      },
    },
    defaultVariants: {
      checked: false,
      size: 'md',
    },
  }
);

const switchThumb = cva('pointer-events-none block rounded-full bg-white shadow-lg transition-transform duration-200', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-7 w-7',
    },
    checked: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', checked: false, class: 'translate-x-0' },
    { size: 'sm', checked: true, class: 'translate-x-4' },
    { size: 'md', checked: false, class: 'translate-x-0' },
    { size: 'md', checked: true, class: 'translate-x-5' },
    { size: 'lg', checked: false, class: 'translate-x-0' },
    { size: 'lg', checked: true, class: 'translate-x-6' },
  ],
  defaultVariants: {
    size: 'md',
    checked: false,
  },
});

interface SwitchProps extends VariantProps<typeof switchTrack> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Switch 컴포넌트
 * @example
 * ```tsx
 * <Switch size="sm" checked={isChecked} onCheckedChange={toggleSwitch} />
 * <Switch size="md" checked={isChecked} onCheckedChange={toggleSwitch} />
 * <Switch size="lg" checked={isChecked} onCheckedChange={toggleSwitch} />
 * ```
 */
export function Switch({ size = 'md', checked = false, onCheckedChange, disabled = false, className }: SwitchProps) {
  const toggle = () => {
    if (disabled) {
      return;
    }
    onCheckedChange?.(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      className={cn(switchTrack({ size, checked }), className)}
    >
      <span className={switchThumb({ size, checked })} />
    </button>
  );
}
