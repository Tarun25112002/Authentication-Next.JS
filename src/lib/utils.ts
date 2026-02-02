import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
export function generateToken(): string {
  return crypto.randomUUID();
}
 export function isExpired(date: Date): boolean {
   return new Date(date) < new Date();
 }
