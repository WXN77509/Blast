import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
https://www.alex-hitchens-school.com/top-1-addict?coupon=2DAYSOFF */
