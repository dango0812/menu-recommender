/** 필터 옵션 */
export const FILTER_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '국&찌개', value: 'soup' },
  { label: '반찬', value: 'side-dish' },
  { label: '후식', value: 'dessert' },
  { label: '초급', value: 'easy' },
  { label: '중급', value: 'medium' },
  { label: '상급', value: 'hard' },
] as const;

export type FilterType = (typeof FILTER_OPTIONS)[number]['value'];
