/**
 * Editor Store
 * Central state management for the editor (React hooks based)
 */

import { useState, useCallback, useMemo } from "react";
import { Layer } from "../../domain/entities/Layer.entity";
import type { TextContent as TextLayerData } from "../../domain/types";
import { FilterSettings } from "../../domain/value-objects/FilterSettings.vo";
import { HistoryService, HistoryState } from "../../domain/services/HistoryService";
import { LayerService } from "../../domain/services/LayerService";
import type { Transform } from "../../domain/entities/Transform";

const historyService = new HistoryService<Layer[]>(20);
const layerService = new LayerService();

export function useEditorStore() {
  // History state
  const [history, setHistory] = useState<HistoryState<Layer[]>>(() =>
    historyService.createInitialState([])
  );
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterSettings>(FilterSettings.DEFAULT);

  // History actions
  const pushLayers = useCallback((layers: Layer[]) => {
    setHistory((prev: HistoryState<Layer[]>) => historyService.push(prev, layers));
  }, []);

  const undo = useCallback(() => {
    setHistory((prev: HistoryState<Layer[]>) => historyService.undo(prev));
  }, []);

  const redo = useCallback(() => {
    setHistory((prev: HistoryState<Layer[]>) => historyService.redo(prev));
  }, []);

  // Layer actions
  const addTextLayer = useCallback((overrides?: Partial<TextLayerData>) => {
    const layer = layerService.createTextLayer(overrides || {});
    pushLayers([...history.present, layer]);
    setActiveLayerId(layer.id);
    return layer.id;
  }, [history.present, pushLayers]);

  const addStickerLayer = useCallback((uri: string) => {
    const layer = layerService.createStickerLayer(uri, {
      zIndex: history.present.length,
    });
    pushLayers([...history.present, layer]);
    setActiveLayerId(layer.id);
    return layer.id;
  }, [history.present, pushLayers]);

  const updateLayer = useCallback((id: string, updates: Partial<Transform>) => {
    const layers = layerService.updateLayer(history.present, id, updates);
    pushLayers(layers);
  }, [history.present, pushLayers]);

  const updateTextLayerContent = useCallback((id: string, updates: Partial<Omit<TextLayerData, "id" | "type">>) => {
    const layers = history.present.map(layer => {
      if (layer.id === id && layer.isText()) {
        return layer.withStyle(updates);
      }
      return layer;
    });
    pushLayers(layers);
  }, [history.present, pushLayers]);

  const deleteLayer = useCallback((id: string) => {
    const layers = layerService.deleteLayer(history.present, id);
    pushLayers(layers);
    if (activeLayerId === id) {
      setActiveLayerId(layers[0]?.id ?? null);
    }
  }, [history.present, activeLayerId, pushLayers]);

  const duplicateLayer = useCallback((id: string) => {
    const layers = layerService.duplicateLayer(history.present, id);
    pushLayers(layers);
    const newLayer = layers[layers.length - 1];
    setActiveLayerId(newLayer.id);
  }, [history.present, pushLayers]);

  const moveLayerUp = useCallback((id: string) => {
    const layers = layerService.moveLayerUp(history.present, id);
    pushLayers(layers);
  }, [history.present, pushLayers]);

  const moveLayerDown = useCallback((id: string) => {
    const layers = layerService.moveLayerDown(history.present, id);
    pushLayers(layers);
  }, [history.present, pushLayers]);

  const selectLayer = useCallback((id: string | null) => {
    setActiveLayerId(id);
  }, []);

  // Filter actions
  const updateFilters = useCallback((updates: Partial<{ brightness: number; contrast: number; saturation: number; sepia: number; grayscale: number; hueRotate?: number }>) => {
    if (updates.brightness !== undefined) {
      setFilters(filters.withBrightness(updates.brightness));
    }
    if (updates.contrast !== undefined) {
      setFilters(filters.withContrast(updates.contrast));
    }
    if (updates.saturation !== undefined) {
      setFilters(filters.withSaturation(updates.saturation));
    }
    if (updates.sepia !== undefined) {
      setFilters(filters.withSepia(updates.sepia));
    }
    if (updates.grayscale !== undefined) {
      setFilters(filters.withGrayscale(updates.grayscale));
    }
    if (updates.hueRotate !== undefined) {
      setFilters(filters.withHueRotate(updates.hueRotate));
    }
  }, [filters]);

  const resetFilters = useCallback(() => {
    setFilters(FilterSettings.DEFAULT);
  }, []);

  // Getters
  const layers = useMemo(() => layerService.sortByZIndex(history.present), [history.present]);
  const activeLayer = useMemo(() =>
    history.present.find((l: Layer) => l.id === activeLayerId) ?? null,
  [history.present, activeLayerId]
  );
  const canUndo = useMemo(() => historyService.canUndo(history), [history]);
  const canRedo = useMemo(() => historyService.canRedo(history), [history]);

  return {
    // State
    layers,
    activeLayerId,
    activeLayer,
    filters,
    canUndo,
    canRedo,

    // History actions
    undo,
    redo,

    // Layer actions
    addTextLayer,
    addStickerLayer,
    updateLayer,
    updateTextLayerContent,
    deleteLayer,
    duplicateLayer,
    moveLayerUp,
    moveLayerDown,
    selectLayer,

    // Filter actions
    updateFilters,
    resetFilters,
  };
}
