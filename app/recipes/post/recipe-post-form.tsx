'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { RHFFormProvider } from '@/components/common/react-hook-form';
import { Button } from '@/components/ui';
import { type RecipePostFormSchema, recipePostSchema } from '@/constants/schemas/recipe-post';

import { BasicInfoSection } from './_components/basic-info-section';
import { CookingStepsSection } from './_components/cooking-steps-section';
import { IngredientsSection } from './_components/ingredients-section';

export function RecipePostForm() {
  const form = useForm<RecipePostFormSchema>({
    resolver: zodResolver(recipePostSchema),
    defaultValues: {
      title: '',
      description: '',
      coverImage: undefined,
      category: 'SOUP',
      level: 'MEDIUM',
      cookingTime: 5,
      mainIngredient: '',
      seasonings: [{ name: '', amount: '' }],
      cookingSteps: [{ image: undefined, description: '', caption: '' }],
    },
  });

  const handleSubmit = (data: RecipePostFormSchema) => {
    console.log(data);
  };

  return (
    <RHFFormProvider form={form} onSubmit={handleSubmit} className="flex flex-col gap-8">
      <BasicInfoSection />
      <IngredientsSection />
      <CookingStepsSection />

      <Button type="submit" fullWidth size="lg">
        레시피 등록하기
      </Button>
    </RHFFormProvider>
  );
}
