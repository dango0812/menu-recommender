import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/tailwind';

const cardVariants = cva('border border-gray-200 bg-white p-5 shadow-sm', {
  variants: {
    round: {
      sm: 'rounded-xl',
      md: 'rounded-2xl',
      lg: 'rounded-3xl',
    },
  },
  defaultVariants: {
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
export function Card({ children, round, className }: CardProps) {
  return <div className={cn(cardVariants({ round }), className)}>{children}</div>;
}
