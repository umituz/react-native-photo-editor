import { useState, useCallback, useMemo } from "react";
import { Layer, TextLayer, ImageFilters } from "../types";
import { HistoryManager } from "../core/HistoryManager";

const DEFAULT_FILTERS: ImageFilters = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  sepia: 0,
  grayscale: 0,
};

const historyManager = new HistoryManager<Layer[]>();

import { DesignTokens } from "@umituz/react-native-design-system";

export const usePhotoEditor = (initialLayers: Layer[] = []) => {
  const [history, setHistory] = useState(() =>
    historyManager.createInitialState(initialLayers),
  );
  const [activeLayerId, setActiveLayerId] = useState<string | null>(
    initialLayers[0]?.id || null,
  );
  const [filters, setFilters] = useState<ImageFilters>(DEFAULT_FILTERS);

  const layers = history.present;

  const canUndo = historyManager.canUndo(history);
  const canRedo = historyManager.canRedo(history);

  const pushState = useCallback((newLayers: Layer[]) => {
    setHistory((prev) => historyManager.push(prev, newLayers));
  }, []);

  const addTextLayer = useCallback(
    (defaultTokens: DesignTokens) => {
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
        color: defaultTokens.colors.onPrimary,
        backgroundColor: "transparent",
        textAlign: "center",
        strokeWidth: 2,
        strokeColor: defaultTokens.colors.onBackground,
      };

      const newLayers: Layer[] = [...layers, newLayer];
      pushState(newLayers);
      setActiveLayerId(newLayer.id);
      return id;
    },
    [layers, pushState],
  );

  const addStickerLayer = useCallback(
    (uri: string) => {
      const id = `sticker-${Date.now()}`;
      const newLayer: Layer = {
        id,
        type: "sticker",
        uri: uri,
        x: 100,
        y: 100,
        rotation: 0,
        scale: 1,
        opacity: 1,
        zIndex: layers.length,
      };

      const newLayers: Layer[] = [...layers, newLayer];
      pushState(newLayers);
      setActiveLayerId(newLayer.id);
      return id;
    },
    [layers, pushState],
  );

  const updateLayer = useCallback(
    (id: string, updates: Partial<Layer>, silent = false) => {
      const newLayers: Layer[] = layers.map((layer) =>
        layer.id === id ? ({ ...layer, ...updates } as Layer) : layer,
      );
      if (silent) {
        // Just update state without pushing to history (hacky but works for init)
        setHistory((prev) => ({ ...prev, present: newLayers }));
      } else {
        pushState(newLayers);
      }
    },
    [layers, pushState],
  );

  const deleteLayer = useCallback(
    (id: string) => {
      if (layers.length <= 1) return;
      const newLayers = layers.filter((layer) => layer.id !== id);
      pushState(newLayers);
      if (activeLayerId === id) {
        setActiveLayerId(newLayers[0]?.id || null);
      }
    },
    [layers, activeLayerId, pushState],
  );

  const undo = useCallback(() => {
    setHistory((prev) => historyManager.undo(prev));
  }, []);

  const redo = useCallback(() => {
    setHistory((prev) => historyManager.redo(prev));
  }, []);

  const selectLayer = useCallback((id: string) => {
    setActiveLayerId(id);
  }, []);

  const bringToFront = useCallback(
    (id: string) => {
      const maxZ = Math.max(...layers.map((l) => l.zIndex), 0);
      updateLayer(id, { zIndex: maxZ + 1 });
    },
    [layers, updateLayer],
  );

  const captureImage = useCallback(
    async (_viewRef: unknown, backgroundUrl: string) => {
      return backgroundUrl;
    },
    [],
  );

  const activeLayer = useMemo(
    () => layers.find((l) => l.id === activeLayerId),
    [layers, activeLayerId],
  );

  return {
    layers: [...layers].sort((a, b) => a.zIndex - b.zIndex),
    activeLayer,
    activeLayerId,
    addTextLayer,
    addStickerLayer,
    updateLayer,
    deleteLayer,
    selectLayer,
    undo,
    redo,
    canUndo,
    canRedo,
    bringToFront,
    filters,
    updateFilters: setFilters,
    captureImage,
  };
};
