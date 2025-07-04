// utils/mergeClasses.ts
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names intelligently using clsx and tailwind-merge.
 *
 * @param inputs - class name strings or conditional class objects
 * @returns a single merged class name string
 */
export function mergeClasses(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
