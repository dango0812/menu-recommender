import { type Ref, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/tailwind';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: Ref<HTMLTextAreaElement>;
};

/**
 * Textarea 컴포넌트
 * @example
 * ```tsx
 * <Textarea rows={3} placeholder="설명을 입력해 주세요" />
 * ```
 */
export function Textarea({ ref, className, ...props }: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        `w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm placeholder-gray-400
        shadow-sm transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:bg-gray-100
        disabled:text-gray-500`,
        className
      )}
      {...props}
    />
  );
}
