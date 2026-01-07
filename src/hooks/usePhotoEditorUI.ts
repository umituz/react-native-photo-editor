import { useRef, useState, useCallback, useEffect } from "react";
import { BottomSheetModalRef, DesignTokens } from "@umituz/react-native-design-system";
import { usePhotoEditor } from "./usePhotoEditor";

export const usePhotoEditorUI = (
  initialCaption: string | undefined,
  tokens: DesignTokens,
) => {
  const textEditorSheetRef = useRef<BottomSheetModalRef>(null);
  const stickerSheetRef = useRef<BottomSheetModalRef>(null);
  const filterSheetRef = useRef<BottomSheetModalRef>(null);
  const layerSheetRef = useRef<BottomSheetModalRef>(null);

  const [selectedFont, setSelectedFont] = useState<string>("Impact");
  const [fontSize, setFontSize] = useState(48);
  const [editingText, setEditingText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("none");

  const {
    layers,
    activeLayerId,
    addTextLayer,
    addStickerLayer,
    updateLayer,
    deleteLayer,
    selectLayer,
    updateFilters,
    filters,
  } = usePhotoEditor([]);

  // Handle initial caption
  useEffect(() => {
    if (initialCaption) {
      const id = addTextLayer(tokens);
      setTimeout(() => {
        updateLayer(id, { text: initialCaption } as any, true);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddText = useCallback(() => {
    addTextLayer(tokens);
    setTimeout(() => textEditorSheetRef.current?.present(), 100);
  }, [addTextLayer, tokens]);

  const handleTextLayerTap = useCallback(
    (layerId: string) => {
      selectLayer(layerId);
      const layer = layers.find((l) => l.id === layerId);
      if (layer?.type === "text") {
        setEditingText((layer as any).text || "");
        setFontSize((layer as any).fontSize || 48);
        textEditorSheetRef.current?.present();
      }
    },
    [selectLayer, layers],
  );

  const handleSaveText = useCallback(() => {
    if (activeLayerId) {
      updateLayer(activeLayerId, {
        text: editingText,
        fontSize,
        fontFamily: selectedFont,
      } as any);
    }
    textEditorSheetRef.current?.dismiss();
  }, [activeLayerId, editingText, fontSize, selectedFont, updateLayer]);

  const handleSelectFilter = useCallback(
    (filterId: string, value: number) => {
      setSelectedFilter(filterId);
      const base = {
        brightness: 1,
        contrast: 1,
        saturation: 1,
        sepia: 0,
        grayscale: 0,
      };
      if (filterId === "sepia") updateFilters({ ...base, sepia: value });
      else if (filterId === "grayscale")
        updateFilters({ ...base, grayscale: value });
      else updateFilters(base);
    },
    [updateFilters],
  );

  const handleSelectSticker = useCallback(
    (sticker: string) => {
      addStickerLayer(sticker);
      stickerSheetRef.current?.dismiss();
    },
    [addStickerLayer],
  );

  return {
    // Refs
    textEditorSheetRef,
    stickerSheetRef,
    filterSheetRef,
    layerSheetRef,
    // State
    selectedFont,
    setSelectedFont,
    fontSize,
    setFontSize,
    editingText,
    setEditingText,
    selectedFilter,
    // Domain State
    layers,
    activeLayerId,
    filters,
    // Domain Actions
    updateLayer,
    deleteLayer,
    selectLayer,
    // UI Actions
    handleAddText,
    handleTextLayerTap,
    handleSaveText,
    handleSelectFilter,
    handleSelectSticker,
  };
};
