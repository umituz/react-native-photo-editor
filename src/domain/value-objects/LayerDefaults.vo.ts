/**
 * Layer Defaults Value Object
 * Centralized default values for layer creation
 */

import type { TextAlign } from "../types";

export const LayerDefaults = {
  // Position defaults
  position: {
    x: 50,
    y: 50,
  },

  // Transform defaults
  transform: {
    rotation: 0,
    scale: 1,
  },

  // Appearance defaults
  appearance: {
    opacity: 1,
    zIndex: 0,
  },

  // Text layer defaults
  text: {
    text: "",
    fontSize: 32,
    fontFamily: "System",
    color: "#FFFFFF",
    backgroundColor: "transparent",
    textAlign: "center" as TextAlign,
    isBold: false,
    isItalic: false,
  },

  // Sticker layer defaults
  sticker: {
    uri: "",
  },

  // Utility functions
  createId(type: "text" | "sticker"): string {
    return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  getNextZIndex(currentLayers: { zIndex: number }[]): number {
    return currentLayers.length > 0
      ? Math.max(...currentLayers.map((l) => l.zIndex)) + 1
      : 0;
  },
} as const;

export type LayerDefaultsType = typeof LayerDefaults;
