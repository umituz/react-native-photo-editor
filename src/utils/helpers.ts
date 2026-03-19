/**
 * Helpers Utility
 * Common helper functions
 */

import type { FilterData } from "../domain/value-objects/FilterSettings.vo";

export function createBrightnessOverlay(brightness: number): {
  color: string;
  opacity: number;
} | null {
  if (brightness < 1) {
    return { color: "black", opacity: Math.min(0.6, 1 - brightness) };
  }
  if (brightness > 1) {
    return { color: "white", opacity: Math.min(0.4, brightness - 1) };
  }
  return null;
}

export function mergeFilters(
  base: FilterData,
  updates: Partial<FilterData>
): FilterData {
  return {
    ...base,
    ...updates,
  };
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function sortByZIndex<T extends { zIndex: number }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => a.zIndex - b.zIndex);
}

export function getNextZIndex(items: { zIndex: number }[]): number {
  return items.length > 0 ? Math.max(...items.map((item) => item.zIndex)) + 1 : 0;
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
