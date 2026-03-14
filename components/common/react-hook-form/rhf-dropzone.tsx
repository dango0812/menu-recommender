import { type ReactNode, useEffect, useState } from 'react';

import { type DropzoneOptions, type FileRejection, useDropzone } from 'react-dropzone';
import { Controller, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Flex, Text } from '@/components/ui';

import { FormHelperText } from '../form-helper-text';

interface RHFDropzoneProps<T extends FieldValues> {
  name: FieldPath<T>;
  label?: ReactNode;
  /** dropzone 옵션 (accept, maxSize 등) */
  options?: Omit<DropzoneOptions, 'onDrop' | 'multiple'>;
  /** 거부 사유별 토스트 메시지 */
  rejectionMessages?: Record<string, string>;
  /** 프리뷰가 있을 때 렌더링 */
  renderPreview: (preview: string, onRemove: () => void) => ReactNode;
  /** 프리뷰가 없을 때 렌더링 (getRootProps, getInputProps 전달) */
  renderPlaceholder: (
    rootProps: ReturnType<ReturnType<typeof useDropzone>['getRootProps']>,
    inputProps: ReturnType<ReturnType<typeof useDropzone>['getInputProps']>,
    isDragActive: boolean
  ) => ReactNode;
}

/**
 * `react-hook-form` 기반 파일 업로드 컴포넌트
 *
 * - `Controller` + `react-dropzone` 조합으로 File 객체를 폼 필드에 직접 저장
 * - preview URL 생명주기를 `useEffect` cleanup으로 자동 관리
 * - 거부 시 `toast.error` 표시
 */
export function RHFDropzone<T extends FieldValues>({
  name,
  label,
  options,
  rejectionMessages,
  renderPreview,
  renderPlaceholder,
}: RHFDropzoneProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Flex direction="column" className="gap-1.5">
          {label && (
            <Text as="label" className="text-sm text-gray-700">
              {label}
            </Text>
          )}

          <DropzoneContent
            file={value}
            onFileChange={onChange}
            options={options}
            rejectionMessages={rejectionMessages}
            renderPreview={renderPreview}
            renderPlaceholder={renderPlaceholder}
          />

          {error && <FormHelperText>{error.message}</FormHelperText>}
        </Flex>
      )}
    />
  );
}

function DropzoneContent({
  file,
  onFileChange,
  options,
  rejectionMessages,
  renderPreview,
  renderPlaceholder,
}: {
  file: File | undefined;
  onFileChange: (file: File | undefined) => void;
  options?: Omit<DropzoneOptions, 'onDrop' | 'multiple'>;
  rejectionMessages?: Record<string, string>;
  renderPreview: (preview: string, onRemove: () => void) => ReactNode;
  renderPlaceholder: (
    rootProps: ReturnType<ReturnType<typeof useDropzone>['getRootProps']>,
    inputProps: ReturnType<ReturnType<typeof useDropzone>['getInputProps']>,
    isDragActive: boolean
  ) => ReactNode;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    // File 객체가 변경될 때마다 preview URL 생성
    const url = URL.createObjectURL(file);
    setPreview(url);

    // clean up
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    multiple: false,
    maxFiles: 1,
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const code = fileRejections[0]?.errors[0]?.code;
        toast.error(rejectionMessages?.[code] ?? '이미지 업로드가 실패했어요');
        return;
      }

      const accepted = acceptedFiles[0];
      if (accepted) {
        onFileChange(accepted);
      }
    },
  });

  const handleRemove = () => onFileChange(undefined);

  if (preview) {
    return renderPreview(preview, handleRemove);
  }

  return renderPlaceholder(getRootProps(), getInputProps(), isDragActive);
}
