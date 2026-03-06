/**
 * Default constants for Photo Editor
 * These can be overridden via props
 */

import type { ImageFilters } from "./types";

export const DEFAULT_TEXT_COLORS = [
  "#FFFFFF", "#000000", "#888888", "#CCCCCC",
  "#FF3B30", "#FF9500", "#FFCC00", "#FF2D55",
  "#34C759", "#30B0C7", "#007AFF", "#5AC8FA",
  "#5856D6", "#AF52DE", "#FF6B6B", "#FFD93D",
  "#6BCB77", "#4D96FF", "#C77DFF", "#F72585",
] as const;

export const DEFAULT_FONTS = [
  "System",
  "Impact",
  "Comic",
  "Serif",
  "Retro",
] as const;

export const DEFAULT_STICKERS = [
  "😀", "😂", "🤣", "😍", "🥰", "😎", "🤯", "🥳", "😤", "💀",
  "🔥", "❤️", "💯", "✨", "🎉", "🤡", "👀", "🙌", "👏", "💪",
  "🤝", "🙈", "🐶", "🐱", "🦊", "🐸", "🌟", "⭐", "🌈", "☀️",
  "🌙", "💫",
] as const;

export interface FilterOption {
  id: string;
  name: string;
  /** Valid AtomicIcon name */
  icon: string;
  /** Partial ImageFilters applied when this filter is selected */
  filters: Partial<ImageFilters>;
}

export const DEFAULT_FILTERS: FilterOption[] = [
  {
    id: "none",
    name: "None",
    icon: "close",
    filters: { brightness: 1, contrast: 1, saturation: 1, sepia: 0, grayscale: 0 },
  },
  {
    id: "sepia",
    name: "Sepia",
    icon: "brush",
    filters: { sepia: 0.7, saturation: 0.8 },
  },
  {
    id: "grayscale",
    name: "B&W",
    icon: "swap-horizontal",
    filters: { grayscale: 1, saturation: 0 },
  },
  {
    id: "vintage",
    name: "Vintage",
    icon: "flash",
    filters: { sepia: 0.3, contrast: 1.1, brightness: 0.9 },
  },
  {
    id: "warm",
    name: "Warm",
    icon: "sparkles",
    filters: { brightness: 1.05, saturation: 1.2 },
  },
  {
    id: "cool",
    name: "Cool",
    icon: "image",
    filters: { contrast: 1.05, brightness: 1.02, saturation: 0.85 },
  },
];

export const DEFAULT_AI_STYLES = [
  { id: "viral", label: "✨ Viral", desc: "Catchy & shareable" },
  { id: "funny", label: "😂 Funny", desc: "Humor that connects" },
  { id: "savage", label: "🔥 Savage", desc: "Bold & edgy" },
  { id: "wholesome", label: "💕 Wholesome", desc: "Warm & positive" },
  { id: "sarcastic", label: "😏 Sarcastic", desc: "Witty & ironic" },
  { id: "relatable", label: "🎯 Relatable", desc: "Everyone gets it" },
] as const;
