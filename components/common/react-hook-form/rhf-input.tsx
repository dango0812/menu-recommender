'use client';

import { type ChangeEvent, type ReactNode } from 'react';

import {
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from 'react-hook-form';

import { Flex, Input, Text } from '@/components/ui';
import { cn } from '@/lib/tailwind';
import { isNumber } from '@/utils';

import { FormHelperText } from '../form-helper-text';

type RHFInputProps<T extends FieldValues> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  /** 필드 이름 */
  name: FieldPath<T>;
  /** 필드 라벨 */
  label?: string;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
  fullWidth?: boolean;
};

/**
 *
 * `react-hook-form` 기반 Input 필드 컴포넌트
 *
 * @example
 * ```tsx
 * <RHFInput<FormData>
 *   name="email"
 *   type="email"
 *   placeholder="이메일"
 *   fullWidth
 *   startDecorator={<Mail size={16} />}
 * />
 * ```
 */
export function RHFInput<T extends FieldValues>({
  name,
  label,
  className,
  startDecorator,
  endDecorator,
  fullWidth,
  type,
  ...props
}: RHFInputProps<T>) {
  const { control } = useFormContext<T>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<T>) => {
    if (type !== 'number') {
      return field.onChange(e.target.value);
    }

    const numberValue = e.target.valueAsNumber;
    field.onChange(isNumber(numberValue) ? numberValue : undefined);
  };

  return (
    <Flex direction="column" className="gap-1.5">
      {label && (
        <Text as="label" className="text-sm text-gray-700">
          {label}
        </Text>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              type={type}
              value={field.value ?? ''}
              onChange={e => handleChange(e, field)}
              fullWidth={fullWidth}
              startDecorator={startDecorator}
              endDecorator={endDecorator}
              className={cn(error && 'border-error focus:border-error', className)}
              {...props}
            />
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </>
        )}
      />
    </Flex>
  );
}
