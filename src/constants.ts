/**
 * Default Constants for Photo Editor
 */

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

export const DEFAULT_AI_STYLES = [
  { id: "viral", label: "✨ Viral", desc: "Catchy & shareable" },
  { id: "funny", label: "😂 Funny", desc: "Humor that connects" },
  { id: "savage", label: "🔥 Savage", desc: "Bold & edgy" },
  { id: "wholesome", label: "💕 Wholesome", desc: "Warm & positive" },
  { id: "sarcastic", label: "😏 Sarcastic", desc: "Witty & ironic" },
  { id: "relatable", label: "🎯 Relatable", desc: "Everyone gets it" },
] as const;

// Filter presets will be in the presentation layer
export { DEFAULT_FILTERS } from "./presentation/components/sheets/FilterSheet";
export type { FilterOption } from "./presentation/components/sheets/FilterSheet";
