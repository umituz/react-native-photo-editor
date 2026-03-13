import { useState, useCallback, useMemo } from "react";
import { Layer, TextLayer, StickerLayer, ImageFilters, DEFAULT_IMAGE_FILTERS } from "../types";
import { HistoryManager, HistoryState } from "../core/HistoryManager";

export const usePhotoEditor = (initialLayers: Layer[] = []) => {
  const historyManager = useMemo(() => new HistoryManager<Layer[]>(), []);
  const [history, setHistory] = useState<HistoryState<Layer[]>>(() =>
    historyManager.createInitialState(initialLayers),
  );
  const [activeLayerId, setActiveLayerId] = useState<string | null>(
    initialLayers[0]?.id ?? null,
  );
  const [filters, setFilters] = useState<ImageFilters>(DEFAULT_IMAGE_FILTERS);

  const layers = history.present;

  const pushState = useCallback(
    (newLayers: Layer[]): void => {
      setHistory((prev) => historyManager.push(prev, newLayers));
    },
    [historyManager],
  );

  const addTextLayer = useCallback(
    (
      defaultColor = "#FFFFFF",
      overrides: Partial<Omit<TextLayer, "id" | "type">> = {},
    ) => {
      const id = `text-${Date.now()}`;
      const newLayer: TextLayer = {
        id,
        type: "text",
        text: "",
        x: 50,
        y: 50,
        rotation: 0,
        scale: 1,
        opacity: 1,
        zIndex: layers.length,
        fontSize: 32,
        fontFamily: "System",
        color: defaultColor,
        backgroundColor: "transparent",
        textAlign: "center",
        ...overrides,
      };
      pushState([...layers, newLayer]);
      setActiveLayerId(id);
      return id;
    },
    [layers, pushState],
  );

  const addStickerLayer = useCallback(
    (uri: string) => {
      const id = `sticker-${Date.now()}`;
      const newLayer: StickerLayer = {
        id,
        type: "sticker",
        uri,
        x: 100,
        y: 100,
        rotation: 0,
        scale: 1,
        opacity: 1,
        zIndex: layers.length,
      };
      pushState([...layers, newLayer]);
      setActiveLayerId(id);
      return id;
    },
    [layers, pushState],
  );

  const updateLayer = useCallback(
    (id: string, updates: Partial<Layer>): void => {
      const newLayers = layers.map((l) => {
        if (l.id !== id) return l;
        // Type-safe merge: cast to Layer since we're merging valid Partial<Layer> with existing Layer
        return { ...l, ...updates } as Layer;
      });
      pushState(newLayers);
    },
    [layers, pushState],
  );

  const deleteLayer = useCallback(
    (id: string): void => {
      const newLayers = layers.filter((l) => l.id !== id);
      pushState(newLayers);
      if (activeLayerId === id) {
        setActiveLayerId(newLayers[0]?.id ?? null);
      }
    },
    [layers, activeLayerId, pushState],
  );

  const duplicateLayer = useCallback(
    (id: string): string | null => {
      const layer = layers.find((l) => l.id === id);
      if (!layer) return null;
      const newId = `${layer.type}-${Date.now()}`;
      // Calculate the next zIndex to avoid conflicts
      const maxZIndex = layers.length > 0 ? Math.max(...layers.map((l) => l.zIndex)) : -1;
      const newLayer = { ...layer, id: newId, x: layer.x + 20, y: layer.y + 20, zIndex: maxZIndex + 1 };
      pushState([...layers, newLayer]);
      setActiveLayerId(newId);
      return newId;
    },
    [layers, pushState],
  );

  const moveLayerUp = useCallback(
    (id: string): void => {
      const sorted = [...layers].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((l) => l.id === id);
      if (idx >= sorted.length - 1) return;
      const reordered = [...sorted];
      [reordered[idx], reordered[idx + 1]] = [reordered[idx + 1], reordered[idx]];
      pushState(reordered.map((l, i) => ({ ...l, zIndex: i })));
    },
    [layers, pushState],
  );

  const moveLayerDown = useCallback(
    (id: string) => {
      const sorted = [...layers].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((l) => l.id === id);
      if (idx <= 0) return;
      const reordered = [...sorted];
      [reordered[idx], reordered[idx - 1]] = [reordered[idx - 1], reordered[idx]];
      pushState(reordered.map((l, i) => ({ ...l, zIndex: i })));
    },
    [layers, pushState],
  );

  const undo = useCallback(
    (): void => setHistory((prev) => historyManager.undo(prev)),
    [historyManager],
  );

  const redo = useCallback(
    (): void => setHistory((prev) => historyManager.redo(prev)),
    [historyManager],
  );

  // Memoize return object to prevent infinite re-renders
  const sortedLayers = useMemo(() => [...layers].sort((a, b) => a.zIndex - b.zIndex), [layers]);
  const activeLayer = useMemo(() => layers.find((l) => l.id === activeLayerId), [layers, activeLayerId]);
  const canUndo = useMemo(() => historyManager.canUndo(history), [history]);
  const canRedo = useMemo(() => historyManager.canRedo(history), [history]);

  return {
    layers: sortedLayers,
    activeLayerId,
    activeLayer,
    addTextLayer,
    addStickerLayer,
    updateLayer,
    deleteLayer,
    duplicateLayer,
    moveLayerUp,
    moveLayerDown,
    selectLayer: setActiveLayerId,
    undo,
    redo,
    canUndo,
    canRedo,
    filters,
    updateFilters: setFilters,
  };
};
