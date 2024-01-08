import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSourceCodeURL(file: string) {
  return `https://github.com/mikah13/react-state/blob/main/src/components/${file}.tsx`;
}
