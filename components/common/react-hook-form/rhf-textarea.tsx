'use client';

import { type ReactNode } from 'react';

import { Controller, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';

import { Flex, Text, Textarea } from '@/components/ui';
import { cn } from '@/lib/tailwind';

import { FormHelperText } from '../form-helper-text';

type RHFTextareaProps<T extends FieldValues> = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & {
  name: FieldPath<T>;
  label?: ReactNode;
};

/**
 * `react-hook-form` 기반 Textarea 필드 컴포넌트
 *
 * @example
 * ```tsx
 * <RHFTextarea<FormData>
 *   name="description"
 *   label="설명"
 *   rows={3}
 *   placeholder="내용을 입력해 주세요"
 * />
 * ```
 */
export function RHFTextarea<T extends FieldValues>({ name, label, className, ...props }: RHFTextareaProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Flex direction="column" className="gap-1.5">
      {label && (
        <Text as="label" className="flex items-center gap-1 text-sm text-gray-700">
          {label}
        </Text>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              {...field}
              value={field.value ?? ''}
              className={cn(error && 'border-error', className)}
              {...props}
            />
            {error ? <FormHelperText>{error.message}</FormHelperText> : null}
          </>
        )}
      />
    </Flex>
  );
}
