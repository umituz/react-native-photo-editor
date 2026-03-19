/**
 * @umituz/react-native-photo-editor
 *
 * A powerful, generic photo editor for React Native
 * Built with DDD principles for maintainability
 */

// Main component
export { PhotoEditor } from "./PhotoEditor";
export type { PhotoEditorProps } from "./PhotoEditor";

// Domain entities
export type { Layer, TextLayer, StickerLayer } from "../entities/Layer.entity"";
export type { Transform } from "./domain/entities/Transform";
export type { FilterValues, FiltersVO } from "./domain/entities/Filters";
export { isTextLayer, isStickerLayer } from "../entities/Layer.entity"";

// Application hooks
export { useEditor } from "./application/hooks/useEditor";
export { useEditorUI } from "./application/hooks/useEditorUI";

// Types & constants
export type { TransformGestureState, TransformGestureConfig } from "./infrastructure/gesture/types";
export { DEFAULT_IMAGE_FILTERS } from "./types";
export { DEFAULT_FONTS, DEFAULT_TEXT_COLORS, DEFAULT_STICKERS, DEFAULT_AI_STYLES } from "./constants";
export type { FilterOption } from "./presentation/components/sheets/FilterSheet";

// Legacy types (for backward compatibility)
export * from "./types";
