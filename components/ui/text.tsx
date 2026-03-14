import { cn } from '@/lib/tailwind';

type TextElement = 'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'em';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: TextElement;
}

/**
 * Text 컴포넌트
 * @example
 * ```tsx
 * <Text>기본 텍스트</Text>
 * <Text as="span">인라인 텍스트</Text>
 * <Text as="h1">제목</Text>
 * ```
 */
export function Text({ children, as = 'p', className, ...props }: TextProps) {
  const Component = as;

  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}
