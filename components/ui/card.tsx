import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind';

const cardVariants = cva('border', {
  variants: {
    variant: {
      elevated: 'border-gray-200 bg-white p-5 shadow-sm',
      outlined: 'border-gray-100 bg-gray-50 p-4',
    },
    round: {
      sm: 'rounded-xl',
      md: 'rounded-2xl',
      lg: 'rounded-3xl',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    round: 'md',
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card 컴포넌트
 * @example
 * ```tsx
 * <Card round="sm">
 *   <Text>Small Round</Text>
 * </Card>
 * ```
 */
export function Card({ children, variant, round, className }: CardProps) {
  return <div className={cn(cardVariants({ variant, round }), className)}>{children}</div>;
}
