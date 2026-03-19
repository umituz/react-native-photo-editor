/**
 * Validators Utility
 * Input validation for editor operations
 */

export function isValidColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isEmojiString(str: string): boolean {
  return (
    str.length <= 4 &&
    !/^https?:\/\//i.test(str) &&
    !str.startsWith("/") &&
    /^[\p{Emoji}\p{Emoji_Component}]+$/u.test(str)
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function validateFontSize(size: number): number {
  return clamp(size, 8, 120);
}

export function validateOpacity(opacity: number): number {
  return clamp(opacity, 0, 1);
}
