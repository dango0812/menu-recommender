'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FormHelperText } from '@/components/common/form-helper-text';
import { RHFInput } from '@/components/common/react-hook-form';
import { Button, Card, Flex, Text } from '@/components/ui';
import { type RecipePostFormSchema } from '@/constants/schemas/recipe-post';

export function IngredientsSection() {
  const {
    control,
    formState: {
      errors: { seasonings: seasoningsError },
    },
  } = useFormContext<RecipePostFormSchema>();

  const { fields, append, remove } = useFieldArray({ control, name: 'seasonings' });

  const handleAddSeasoning = () => append({ name: '', amount: '' });

  return (
    <Flex direction="column" className="gap-8">
      {/* 주재료 */}
      <Card>
        <Flex direction="column" className="gap-4">
          <Text as="h2" className="text-lg font-bold text-gray-800">
            주재료
          </Text>

          <Card variant="outlined">
            <Flex direction="column" className="gap-2">
              <Text className="text-sm text-gray-500">주재료를 입력해 주세요</Text>
              <RHFInput<RecipePostFormSchema> name="mainIngredient" placeholder="예: 두부, 감자, 돼지고기" fullWidth />
            </Flex>
          </Card>
        </Flex>
      </Card>

      {/* 양념 */}
      <Card>
        <Flex direction="column" className="gap-4">
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="h2" className="text-lg font-bold text-gray-800">
              양념
            </Text>
            <Button size="sm" color="gray" startDecorator={<Plus size={14} />} onClick={handleAddSeasoning}>
              양념 추가
            </Button>
          </Flex>

          {seasoningsError?.root && <FormHelperText>{seasoningsError.root.message}</FormHelperText>}

          <Card variant="outlined">
            <Flex direction="column" className="gap-3">
              {fields.map((field, index) => (
                <Flex key={field.id} alignItems="flex-start" className="gap-3">
                  <Flex alignItems="flex-start" className="min-w-0 flex-1 gap-3">
                    <RHFInput<RecipePostFormSchema>
                      name={`seasonings.${index}.name`}
                      placeholder="양념명 (예: 간장)"
                      fullWidth
                    />
                    <RHFInput<RecipePostFormSchema>
                      name={`seasonings.${index}.amount`}
                      placeholder="양 (예: 1스푼)"
                      fullWidth
                    />
                  </Flex>

                  {fields.length > 1 && (
                    <Flex alignItems="center" justifyContent="center" className="h-12.5">
                      <Button
                        aria-label={`양념 ${index + 1} 삭제`}
                        onClick={() => remove(index)}
                        color="light"
                        size="sm"
                        className="h-9 w-9 bg-transparent text-gray-400"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Flex>
                  )}
                </Flex>
              ))}
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Flex>
  );
}
