/**
 * Central Type Exports
 * Re-exports domain types for convenience
 */

export type { TextAlign } from "../entities/Layer.entity"";
export type { Layer, TextLayer, StickerLayer, TextLayerData, StickerLayerData } from "../entities/Layer.entity"";
export type { Transform } from "./domain/entities/Transform";
export type { FilterValues as ImageFilters } from "./domain/entities/Filters";

// Re-export type guards
export { isTextLayer, isStickerLayer } from "../entities/Layer.entity"";

// Re-export DEFAULT_FILTERS as value (not type)
export { DEFAULT_FILTERS as DEFAULT_IMAGE_FILTERS } from "./domain/entities/Filters";
