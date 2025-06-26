import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names into a single string.
 *
 * Use this in place of `clsx` or `twMerge` to merge multiple class names into a single string.
 *
 * @param inputs - A list of class names to merge.
 * @returns A single class name string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
