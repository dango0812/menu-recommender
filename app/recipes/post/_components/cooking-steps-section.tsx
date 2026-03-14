'use client';

import { ImagePlus, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FormHelperText } from '@/components/common/form-helper-text';
import { RHFDropzone, RHFInput } from '@/components/common/react-hook-form';
import { Button, Card, Flex, Text } from '@/components/ui';
import { type RecipePostFormSchema } from '@/constants/schemas/recipe-post';
import { ACCEPTED_IMAGE_TYPES, FILE_REJECTION_MESSAGES } from '@/constants/upload';
import { cn } from '@/lib/tailwind';

export function CookingStepsSection() {
  const {
    control,
    formState: {
      errors: { cookingSteps: cookingStepsError },
    },
  } = useFormContext<RecipePostFormSchema>();

  const { fields, append, remove } = useFieldArray({ control, name: 'cookingSteps' });

  const handleAddStep = () => append({ image: undefined, description: '', caption: '' });

  return (
    <Card>
      <Flex direction="column" className="gap-4">
        <Flex justifyContent="space-between" alignItems="center">
          <Text as="h2" className="text-lg font-bold text-gray-800">
            조리 순서
          </Text>
          <Button size="sm" color="gray" startDecorator={<Plus size={14} />} onClick={handleAddStep}>
            단계 추가
          </Button>
        </Flex>

        {cookingStepsError?.root && <FormHelperText>{cookingStepsError.root.message}</FormHelperText>}

        {fields.map((field, index) => (
          <Card key={field.id} variant="outlined">
            <Flex direction="column" className="gap-3">
              <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center" className="gap-2">
                  <Text
                    as="span"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold
                      text-white"
                  >
                    {index + 1}
                  </Text>
                  <Text className="text-sm font-medium text-gray-500">단계</Text>
                </Flex>
                {fields.length > 1 && (
                  <Button
                    aria-label={`${index + 1}단계 삭제`}
                    onClick={() => remove(index)}
                    color="light"
                    size="sm"
                    className="h-9 w-9 bg-transparent text-gray-400"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </Flex>

              <RHFDropzone<RecipePostFormSchema>
                name={`cookingSteps.${index}.image`}
                options={{ accept: ACCEPTED_IMAGE_TYPES, maxSize: 5 * 1024 * 1024 }}
                rejectionMessages={FILE_REJECTION_MESSAGES}
                renderPreview={(preview, onRemove) => (
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <Image src={preview} alt={`${index + 1}단계 이미지`} fill className="object-cover" />
                    <Button
                      aria-label={`${index + 1}단계 이미지 제거`}
                      onClick={onRemove}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 p-1.5 text-white
                        transition-colors hover:bg-black/70 active:bg-black/70"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                )}
                renderPlaceholder={(rootProps, inputProps, isDragActive) => (
                  <Flex
                    {...rootProps}
                    alignItems="center"
                    justifyContent="center"
                    className={cn(
                      `cursor-pointer gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-6
                      transition-colors hover:border-gray-300 hover:bg-gray-100`,
                      { 'border-primary bg-primary/5': isDragActive }
                    )}
                  >
                    <input {...inputProps} />
                    <ImagePlus size={18} className="text-gray-400" />
                    <Text className="text-xs text-gray-400">
                      {isDragActive ? '여기에 놓아주세요' : '이미지 추가 (선택)'}
                    </Text>
                  </Flex>
                )}
              />

              <RHFInput<RecipePostFormSchema>
                name={`cookingSteps.${index}.description`}
                placeholder="조리 방법을 입력해 주세요 (예: 두부를 2cm 크기로 잘라주세요)"
                fullWidth
              />
              <RHFInput<RecipePostFormSchema>
                name={`cookingSteps.${index}.caption`}
                placeholder="추가 설명 (선택)"
                fullWidth
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
}
