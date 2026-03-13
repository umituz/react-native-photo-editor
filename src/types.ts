/**
 * Editor Domain Types
 */

export type TextAlign = "left" | "center" | "right";

export interface ImageFilters {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  grayscale: number;
  hueRotate?: number; // 0-360 degrees
}

export const DEFAULT_IMAGE_FILTERS: ImageFilters = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  sepia: 0,
  grayscale: 0,
};

export interface BaseLayer {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
  type: "text" | "sticker";
}

export interface TextLayer extends BaseLayer {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  textAlign: TextAlign;
  isBold?: boolean;
  isItalic?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface StickerLayer extends BaseLayer {
  type: "sticker";
  uri: string;
}

export type Layer = TextLayer | StickerLayer;

export interface EditorState {
  layers: Layer[];
  activeLayerId: string | null;
  canvasSize: { width: number; height: number };
  filters: ImageFilters;
}

// Type guards for discriminating union types
export function isTextLayer(layer: Layer): layer is TextLayer {
  return layer.type === "text";
}

export function isStickerLayer(layer: Layer): layer is StickerLayer {
  return layer.type === "sticker";
}
