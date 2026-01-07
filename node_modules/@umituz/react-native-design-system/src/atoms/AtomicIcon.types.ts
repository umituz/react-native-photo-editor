/**
 * Icon Type Definitions
 * Centralized icon types for @expo/vector-icons Ionicons
 */

import type { Ionicons } from "@expo/vector-icons";

/**
 * All available Ionicons names (type-safe)
 */
export type IoniconsName = keyof typeof Ionicons.glyphMap;

/**
 * Semantic icon size presets
 */
export type IconSizePreset = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

/**
 * Icon size - preset name or custom number in pixels
 */
export type IconSize = IconSizePreset | number;

/**
 * Icon size mapping to pixels
 */
export const ICON_SIZES: Record<IconSizePreset, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

/**
 * Get icon size in pixels
 */
export function getIconSize(size: IconSize): number {
    if (typeof size === "number") return size;
    return ICON_SIZES[size];
}

/**
 * Check if size is a preset
 */
export function isIconSizePreset(size: IconSize): size is IconSizePreset {
    return typeof size === "string" && size in ICON_SIZES;
}
