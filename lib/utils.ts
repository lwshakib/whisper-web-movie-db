import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges and optimizes Tailwind CSS class names using clsx and tailwind-merge.
 * This ensures that conflicting classes are resolved correctly and conditional classes are simplified.
 * @param inputs - Any number of class values (strings, objects, arrays, etc.)
 * @returns A single string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
