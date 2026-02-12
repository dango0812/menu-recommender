/**
 * 배열에서 중복 없이 요소를 추출하는 함수
 * @param arr 원본 배열
 * @param count 추출할 개수
 *
 * @example
 * ```ts
 * const items = ['a', 'b', 'c', 'd', 'e'];
 * const randomItems = pickRandom(items, 3);
 * console.log(randomItems); // Ex. ['c', 'a', 'e']
 * ```
 */
export function pickRandom<T>(arr: T[], count: number): T[] {
  const result = new Set<T>();
  const limit = Math.min(count, arr.length);

  while (result.size < limit) {
    result.add(arr[Math.floor(Math.random() * arr.length)]);
  }

  return [...result];
}
