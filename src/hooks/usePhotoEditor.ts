import { useState, useCallback, useMemo } from "react";
import { DesignTokens } from "@umituz/react-native-design-system";
import { Layer, TextLayer, StickerLayer, ImageFilters } from "../types";
import { HistoryManager, HistoryState } from "../core/HistoryManager";

const DEFAULT_FILTERS: ImageFilters = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  sepia: 0,
  grayscale: 0,
};

export const usePhotoEditor = (initialLayers: Layer[] = []) => {
  const historyManager = useMemo(() => new HistoryManager<Layer[]>(), []);
  const [history, setHistory] = useState<HistoryState<Layer[]>>(() =>
    historyManager.createInitialState(initialLayers),
  );
  const [activeLayerId, setActiveLayerId] = useState<string | null>(
    initialLayers[0]?.id || null,
  );
  const [filters, setFilters] = useState<ImageFilters>(DEFAULT_FILTERS);

  const layers = history.present;

  const pushState = useCallback((newLayers: Layer[]) => {
    setHistory((prev) => historyManager.push(prev, newLayers));
  }, [historyManager]);

  const addTextLayer = useCallback(
    (tokens: DesignTokens) => {
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
        color: tokens.colors.textPrimary,
        backgroundColor: "transparent",
        textAlign: "center",
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
    (id: string, updates: Partial<Layer>) => {
      const newLayers = layers.map((l) => (l.id === id ? { ...l, ...updates } : l) as Layer);
      pushState(newLayers);
    },
    [layers, pushState],
  );

  const deleteLayer = useCallback(
    (id: string) => {
      const newLayers = layers.filter((l) => l.id !== id);
      pushState(newLayers);
      if (activeLayerId === id) setActiveLayerId(newLayers[0]?.id || null);
    },
    [layers, activeLayerId, pushState],
  );

  return {
    layers: [...layers].sort((a, b) => a.zIndex - b.zIndex),
    activeLayerId,
    activeLayer: layers.find((l) => l.id === activeLayerId),
    addTextLayer,
    addStickerLayer,
    updateLayer,
    deleteLayer,
    selectLayer: setActiveLayerId,
    undo: useCallback(() => setHistory(historyManager.undo), [historyManager]),
    redo: useCallback(() => setHistory(historyManager.redo), [historyManager]),
    canUndo: historyManager.canUndo(history),
    canRedo: historyManager.canRedo(history),
    filters,
    updateFilters: setFilters,
  };
};
