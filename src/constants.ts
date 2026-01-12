/**
 * Default constants for Photo Editor
 * These can be overridden via props
 */

export const DEFAULT_FONTS = ["Impact", "Comic", "Serif", "Retro"] as const;

export const DEFAULT_STICKERS = [
  "😀",
  "😂",
  "🤣",
  "😍",
  "🥰",
  "😎",
  "🤯",
  "🥳",
  "😤",
  "💀",
  "🔥",
  "❤️",
  "💯",
  "✨",
  "🎉",
  "🤡",
  "👀",
  "🙌",
  "👏",
  "💪",
  "🤝",
  "🙈",
  "🐶",
  "🐱",
  "🦊",
  "🐸",
  "🌟",
  "⭐",
  "🌈",
  "☀️",
  "🌙",
  "💫",
] as const;

export type FilterType = "none" | "sepia" | "grayscale" | "vintage" | "warm" | "cool";

export interface FilterOption {
  id: FilterType;
  name: string;
  icon: string;
  value: number;
}

export const DEFAULT_FILTERS = [
  { id: "none" as FilterType, name: "None", icon: "close-circle", value: 0 },
  { id: "sepia" as FilterType, name: "Sepia", icon: "color-palette", value: 0.5 },
  { id: "grayscale" as FilterType, name: "B&W", icon: "contrast", value: 1 },
  { id: "vintage" as FilterType, name: "Vintage", icon: "time", value: 0.7 },
  { id: "warm" as FilterType, name: "Warm", icon: "sunny", value: 0.3 },
  { id: "cool" as FilterType, name: "Cool", icon: "snow", value: 0.3 },
] as const;

export const DEFAULT_AI_STYLES = [
  { id: "viral", label: "✨ Viral", desc: "Catchy & shareable" },
  { id: "funny", label: "😂 Funny", desc: "Humor that connects" },
  { id: "savage", label: "🔥 Savage", desc: "Bold & edgy" },
  { id: "wholesome", label: "💕 Wholesome", desc: "Warm & positive" },
  { id: "sarcastic", label: "😏 Sarcastic", desc: "Witty & ironic" },
  { id: "relatable", label: "🎯 Relatable", desc: "Everyone gets it" },
] as const;
