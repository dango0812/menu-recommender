/**
 * 전달된 값이 숫자인지 확인하는 함수
 *
 * @param {unknown} value - 숫자인지 확인할 값
 * @returns {value is number} 값이 숫자인 경우 true, 그렇지 않은 경우 false를 반환
 *
 * @example
 * const value1 = 123;
 * const value2 = 'abc';
 * const value3 = true;
 *
 * console.log(isNumber(value1)); // true
 * console.log(isNumber(value2)); // false
 * console.log(isNumber(value3)); // false
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
