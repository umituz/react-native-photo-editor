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
}

export interface BaseLayer {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
  type: "text" | "sticker" | "image";
}

export interface TextLayer extends BaseLayer {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  textAlign: TextAlign;
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
