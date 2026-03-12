'use client';

import { type ReactNode } from 'react';

import { type FieldValues, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

type FormProviderProps<T extends FieldValues> = {
  /** useForm에서 반환된 객체 */
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

/**
 * `react-hook-form` 기반 폼 상태와 제출 핸들러를 자식 컴포넌트에 전달하는 컴포넌트
 *
 * 내부적으로 <form> 태그를 포함하고 있어 별도의 제출 처리가 필요 없음
 * `className`, `onInput`, `onChange` 등 표준 form 속성을 모두 지원
 *
 * @example
 * ```tsx
 * <RHFFormProvider form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
 *    <RHFInput<FormData> name="name" />
 *    <button type="submit">제출</button>
 * </RHFFormProvider>
 * ```
 */
export function RHFFormProvider<T extends FieldValues>({ form, onSubmit, children, ...props }: FormProviderProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
