import type { Recipe, RecipeApiResponse, RecipeFilteredData } from '@/app/api/recipes/type';
import { env } from '@/constants/env';
import { getRecipeLevel } from '@/utils/recipe';

/**
 * 식품의약품안전처 공공데이터 조리식품의 레시피 API 호출 함수
 * @returns 레시피 목록
 */
export async function fetchAllRecipes(): Promise<RecipeFilteredData[]> {
  let allRecipes: Recipe[] = [];
  /**
   * 한 번에 가져올 최대 레시피 수
   * API의 최대 응답 크기 제한에 따라 조정 필요
   * 2026-02-13 기준 최대 개수가 1146개, 깔끔하게 하려했으나 1000개 제한 및 600 이상이면 2MB Fetch Cache 조건을 넘기에 600으로 설정
   */
  const PAGE_SIZE = 600;

  async function fetchBatch(start: number) {
    const end = start + PAGE_SIZE - 1;
    const url = `${env.FOOD_SAFETY_API_BASE_URL}/${env.FOOD_SAFETY_API_KEY}/COOKRCP01/json/${start}/${end}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        cache: 'force-cache',
        next: {
          // TODO: 빌드 시간 단축 및 영구 캐시 설정
          revalidate: false,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch API');
      }

      const data: RecipeApiResponse = await response.json();
      const rows = data.COOKRCP01?.row || [];

      if (rows.length > 0) {
        allRecipes = [...allRecipes, ...rows];
      }

      // 가져온 데이터가 요청한 PAGE_SIZE와 같을 때 재귀
      if (rows.length === PAGE_SIZE) {
        await fetchBatch(start + PAGE_SIZE);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }

  await fetchBatch(1);
  return allRecipes.map(item => {
    const instructions = Array.from({ length: 20 }, (_, i) => {
      const n = i + 1;
      const num = n < 10 ? `0${n}` : n.toString();

      return {
        step: item[`MANUAL${num}` as keyof Recipe],
        img: item[`MANUAL_IMG${num}` as keyof Recipe],
      };
    }).filter(inst => inst.step);

    return {
      id: item.RCP_SEQ,
      menu: item.RCP_NM,
      tip: item.RCP_NA_TIP,
      type: item.RCP_PAT2,
      thumbnail: item.ATT_FILE_NO_MAIN,
      detailImage: item.ATT_FILE_NO_MK,
      ingredients: item.RCP_PARTS_DTLS,
      nutrition: {
        calories: parseFloat(item.INFO_ENG) || 0,
        protein: parseFloat(item.INFO_PRO) || 0,
        fat: parseFloat(item.INFO_FAT) || 0,
        carbs: parseFloat(item.INFO_CAR) || 0,
        sodium: parseFloat(item.INFO_NA) || 0,
      },
      instructions,
      level: getRecipeLevel(instructions.length),
    };
  });
}
