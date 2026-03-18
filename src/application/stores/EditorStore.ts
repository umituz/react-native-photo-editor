/**
 * Editor Store
 * Central state management for the editor (React hooks based)
 */

import { useState, useCallback, useMemo } from "react";
import { Layer, TextLayer, StickerLayer } from "../../domain/entities/Layer";
import { FiltersVO, FilterValues, DEFAULT_FILTERS } from "../../domain/entities/Filters";
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
  const [filters, setFilters] = useState<FiltersVO>(FiltersVO.default());

  // History actions
  const pushLayers = useCallback((layers: Layer[]) => {
    setHistory((prev) => historyService.push(prev, layers));
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => historyService.undo(prev));
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => historyService.redo(prev));
  }, []);

  // Layer actions
  const addTextLayer = useCallback((overrides?: Partial<Omit<TextLayerData, "id" | "type">>) => {
    const layer = layerService.createTextLayer({
      ...overrides,
      zIndex: history.present.length,
    });
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
  const updateFilters = useCallback((updates: Partial<FilterValues>) => {
    const current = filters.toJSON();
    setFilters(FiltersVO.from({ ...current, ...updates }));
  }, [filters]);

  const resetFilters = useCallback(() => {
    setFilters(FiltersVO.default());
  }, []);

  // Getters
  const layers = useMemo(() => layerService.sortByZIndex(history.present), [history.present]);
  const activeLayer = useMemo(() =>
    history.present.find(l => l.id === activeLayerId) ?? null,
  [history.present, activeLayerId]
  );
  const canUndo = useMemo(() => historyService.canUndo(history), [history]);
  const canRedo = useMemo(() => historyService.canRedo(history), [history]);

  return {
    // State
    layers,
    activeLayerId,
    activeLayer,
    filters: filters.toJSON(),
    canUndo,
    canRedo,

    // History actions
    undo,
    redo,

    // Layer actions
    addTextLayer,
    addStickerLayer,
    updateLayer,
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
