import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @param inputs - string, array, object
 * @returns 병합된 string 을 반환합니다.
 *
 * @example
 * Code : cn("text-base", "bg-white");
 * Return : "text-base bg-white"
 *
 * @example
 * Code : cn("text-base", ["bg-white", "rounded-lg"]);
 * Return : "text-base bg-white rounded-lg"
 *
 * @example
 * Code : const isAuthenticated = true;
 * cn("text-base", ["bg-white", "rounded-lg"], { hidden : !isAuthenticated, block : isAuthenticated });
 * Return : "text-base bg-white rounded-lg block"
 *
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
