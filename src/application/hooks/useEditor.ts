/**
 * Use Editor Hook
 * Main editor hook that wraps the store
 */

import { useMemo } from "react";
import { useEditorStore } from "../stores/EditorStore";
import { Layer } from "../../domain/entities/Layer";
import type { TextLayerData } from "../../domain/entities/Layer";
import type { Transform } from "../../domain/entities/Transform";
import type { FilterValues } from "../../domain/entities/Filters";

export function useEditor() {
  const store = useEditorStore();

  return useMemo(() => ({
    // State
    layers: store.layers,
    activeLayerId: store.activeLayerId,
    activeLayer: store.activeLayer,
    filters: store.filters,
    canUndo: store.canUndo,
    canRedo: store.canRedo,

    // History actions
    undo: store.undo,
    redo: store.redo,

    // Layer actions
    addTextLayer: store.addTextLayer,
    addStickerLayer: store.addStickerLayer,
    updateLayer: store.updateLayer,
    deleteLayer: store.deleteLayer,
    duplicateLayer: store.duplicateLayer,
    moveLayerUp: store.moveLayerUp,
    moveLayerDown: store.moveLayerDown,
    selectLayer: store.selectLayer,

    // Filter actions
    updateFilters: store.updateFilters,
    resetFilters: store.resetFilters,
  }), [
    store.layers,
    store.activeLayerId,
    store.activeLayer,
    store.filters,
    store.canUndo,
    store.canRedo,
    store.undo,
    store.redo,
    store.addTextLayer,
    store.addStickerLayer,
    store.updateLayer,
    store.deleteLayer,
    store.duplicateLayer,
    store.moveLayerUp,
    store.moveLayerDown,
    store.selectLayer,
    store.updateFilters,
    store.resetFilters,
  ]);
}

export type { Layer } from "../../domain/entities/Layer";
export type { Transform } from "../../domain/entities/Transform";
export type { FilterValues } from "../../domain/entities/Filters";
export type { TextLayerData } from "../../domain/entities/Layer";
