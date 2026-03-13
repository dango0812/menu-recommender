'use client';

import { type ReactNode } from 'react';

import { Controller, type FieldPath, type FieldValues, type PathValue, useFormContext } from 'react-hook-form';

import { Chip, Flex, Text } from '@/components/ui';

import { FormHelperText } from '../form-helper-text';

type ChipOption = Readonly<{ id: string; label: string }>;
type RHFChipGroupProps<T extends FieldValues> = {
  name: FieldPath<T>;
  options: readonly ChipOption[];
  label?: ReactNode;
};

/**
 * `react-hook-form` 기반 Chip 선택 그룹 컴포넌트
 *
 * - `Controller` 기반으로 상태/에러를 일관되게 관리
 * - 동일 값 재선택 시 무시하여 불필요한 상태 업데이트 방지
 *
 * @example
 * ```tsx
 *
 * const OPTIONS = [
 *  { id: 'option1', label: '옵션 1' },
 *  { id: 'option2', label: '옵션 2' }
 * ]
 *
 * <RHFChipGroup<FormData>
 *   name="category"
 *   label="카테고리"
 *   options={OPTIONS}
 * />
 * ```
 */
export function RHFChipGroup<T extends FieldValues>({ name, options, label }: RHFChipGroupProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleSelect = (value: string) => {
          if (field.value === value) {
            return;
          }

          field.onChange(value as PathValue<T, typeof name>);
        };

        return (
          <Flex direction="column" className="gap-2">
            {label && (
              <Text as="label" className="text-sm text-gray-700">
                {label}
              </Text>
            )}

            <Flex className="gap-2">
              {options.map(({ id, label: optionLabel }) => (
                <Chip
                  key={id}
                  size="sm"
                  color={field.value === id ? 'primary' : 'light'}
                  onClick={() => handleSelect(id)}
                >
                  {optionLabel}
                </Chip>
              ))}
            </Flex>

            {error && <FormHelperText>{error.message}</FormHelperText>}
          </Flex>
        );
      }}
    />
  );
}
