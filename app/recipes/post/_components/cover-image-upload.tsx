'use client';

import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

import { RHFDropzone } from '@/components/common/react-hook-form';
import { Button, Flex, Text } from '@/components/ui';
import { type RecipePostFormSchema } from '@/constants/schemas/recipe-post';
import { ACCEPTED_IMAGE_TYPES, FILE_REJECTION_MESSAGES } from '@/constants/upload';
import { cn } from '@/lib/tailwind';

export function CoverImageUpload() {
  return (
    <RHFDropzone<RecipePostFormSchema>
      name="coverImage"
      label={
        <>
          커버 이미지
          <Text as="span" className="text-gray-400">
            (선택)
          </Text>
        </>
      }
      options={{ accept: ACCEPTED_IMAGE_TYPES, maxSize: 5 * 1024 * 1024, minSize: 8 }}
      rejectionMessages={FILE_REJECTION_MESSAGES}
      renderPreview={(preview, onRemove) => (
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image src={preview} alt="커버 이미지" fill className="object-cover" />
          <Button
            size="sm"
            aria-label="커버 이미지 제거"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 p-1.5 text-white transition-colors
              hover:bg-black/70 active:bg-black/70"
            onClick={onRemove}
          >
            <X size={16} />
          </Button>
        </div>
      )}
      renderPlaceholder={(rootProps, inputProps, isDragActive) => (
        <Flex
          {...rootProps}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={cn(
            `aspect-video cursor-pointer gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50
            transition-colors hover:border-gray-300 hover:bg-gray-100`,
            { 'border-primary bg-primary/5': isDragActive }
          )}
        >
          <input {...inputProps} />
          <ImagePlus size={32} className="text-gray-400" />
          <Text className="text-sm text-gray-400">
            {isDragActive ? '여기에 이미지를 놓아주세요' : '이미지를 업로드해 주세요'}
          </Text>
          <Text className="text-xs text-gray-300">JPG, PNG, WebP (최대 5MB)</Text>
        </Flex>
      )}
    />
  );
}
