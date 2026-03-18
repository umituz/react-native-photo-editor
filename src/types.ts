/**
 * Legacy Types (for backward compatibility)
 *
 * @deprecated Use types from src/domain/entities/ instead
 */

export type { TextAlign } from "./domain/entities/Layer";
export type { Layer, TextLayer, StickerLayer } from "./domain/entities/Layer";
export type { Transform } from "./domain/entities/Transform";
export type { FilterValues as ImageFilters, DEFAULT_FILTERS as DEFAULT_IMAGE_FILTERS } from "./domain/entities/Filters";

// Re-export type guards
export { isTextLayer, isStickerLayer } from "./domain/entities/Layer";

// Legacy type alias
export interface TextLayerData extends TextLayer {}
export interface StickerLayerData extends StickerLayer {}

// Legacy EditorState (kept for compatibility)
export interface EditorState {
  layers: Layer[];
  activeLayerId: string | null;
  canvasSize: { width: number; height: number };
  filters: ImageFilters;
}
