import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number string to Indonesian Rupiah format (dot separator).
 * Example: "1800000" → "1.800.000"
 */
export function formatRupiah(value: string): string {
  const num = value.replace(/\D/g, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Parse formatted Rupiah back to raw number string.
 * Example: "1.800.000" → "1800000"
 */
export function parseRupiah(value: string): string {
  return value.replace(/\./g, "");
}
