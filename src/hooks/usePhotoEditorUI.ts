import { useRef, useState, useCallback, useEffect } from "react";
import { BottomSheetModalRef } from "@umituz/react-native-design-system/molecules";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { usePhotoEditor } from "./usePhotoEditor";
import { TextLayer, DEFAULT_IMAGE_FILTERS, ImageFilters, TextAlign } from "../types";
import type { FilterOption } from "../constants";
import type { LayerTransform } from "../components/DraggableText";

export const usePhotoEditorUI = (initialCaption?: string) => {
  const tokens = useAppDesignTokens();

  // Bottom sheet refs
  const textEditorSheetRef = useRef<BottomSheetModalRef>(null);
  const stickerSheetRef = useRef<BottomSheetModalRef>(null);
  const filterSheetRef = useRef<BottomSheetModalRef>(null);
  const adjustmentsSheetRef = useRef<BottomSheetModalRef>(null);
  const layerSheetRef = useRef<BottomSheetModalRef>(null);
  const aiSheetRef = useRef<BottomSheetModalRef>(null);

  // Global text/font state
  const [selectedFont, setSelectedFont] = useState<string>("System");
  const [fontSize, setFontSize] = useState(48);

  // Per-layer text editing state (populated when sheet opens)
  const [editingText, setEditingText] = useState("");
  const [editingColor, setEditingColor] = useState<string>(tokens.colors.textPrimary);
  const [editingAlign, setEditingAlign] = useState<TextAlign>("center");
  const [editingBold, setEditingBold] = useState(false);
  const [editingItalic, setEditingItalic] = useState(false);

  // Filter state
  const [selectedFilter, setSelectedFilter] = useState("none");

  const editor = usePhotoEditor([]);

  // Apply initial caption once on mount — single history entry
  const prevInitialCaptionRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Only apply if initialCaption changed and is different from previous value
    if (initialCaption && initialCaption !== prevInitialCaptionRef.current) {
      prevInitialCaptionRef.current = initialCaption;
      editor.addTextLayer(tokens.colors.textPrimary, { text: initialCaption });
    }
  }, [initialCaption, editor]);

  const handleTextLayerTap = useCallback(
    (layerId: string): void => {
      editor.selectLayer(layerId);
      const layer = editor.layers.find((l) => l.id === layerId);
      if (layer?.type === "text") {
        const textLayer = layer as TextLayer;
        setEditingText(textLayer.text ?? "");
        setFontSize(textLayer.fontSize ?? 48);
        setEditingColor(textLayer.color ?? tokens.colors.textPrimary);
        setEditingAlign(textLayer.textAlign ?? "center");
        setEditingBold(textLayer.isBold ?? false);
        setEditingItalic(textLayer.isItalic ?? false);
        textEditorSheetRef.current?.present();
      }
    },
    [editor, tokens.colors.textPrimary],
  );

  const handleSaveText = useCallback((): void => {
    if (editor.activeLayerId) {
      editor.updateLayer(editor.activeLayerId, {
        text: editingText,
        fontSize,
        fontFamily: selectedFont,
        color: editingColor,
        textAlign: editingAlign,
        isBold: editingBold,
        isItalic: editingItalic,
      });
    }
    textEditorSheetRef.current?.dismiss();
  }, [
    editor,
    editingText,
    fontSize,
    selectedFont,
    editingColor,
    editingAlign,
    editingBold,
    editingItalic,
  ]);

  const handleSelectFilter = useCallback(
    (option: FilterOption): void => {
      setSelectedFilter(option.id);
      const newFilters: ImageFilters = { ...DEFAULT_IMAGE_FILTERS, ...option.filters };
      editor.updateFilters(newFilters);
      filterSheetRef.current?.dismiss();
    },
    [editor],
  );

  const handleLayerTransform = useCallback(
    (layerId: string, transform: LayerTransform): void => {
      editor.updateLayer(layerId, {
        x: transform.x,
        y: transform.y,
        scale: transform.scale,
        rotation: transform.rotation,
      });
    },
    [editor],
  );

  return {
    ...editor,
    // Sheet refs
    textEditorSheetRef,
    stickerSheetRef,
    filterSheetRef,
    adjustmentsSheetRef,
    layerSheetRef,
    aiSheetRef,
    // Font/size
    selectedFont,
    setSelectedFont,
    fontSize,
    setFontSize,
    // Text editing
    editingText,
    setEditingText,
    editingColor,
    setEditingColor,
    editingAlign,
    setEditingAlign,
    editingBold,
    setEditingBold,
    editingItalic,
    setEditingItalic,
    // Filter
    selectedFilter,
    // Handlers
    handleTextLayerTap,
    handleSaveText,
    handleSelectFilter,
    handleLayerTransform,
    handleAddText: useCallback((): void => {
      const color = tokens.colors.textPrimary;
      setEditingText("");
      setEditingColor(color);
      setEditingAlign("center");
      setEditingBold(false);
      setEditingItalic(false);
      // Create layer with the currently active font settings so canvas preview matches sheet
      editor.addTextLayer(color, {
        fontSize,
        fontFamily: selectedFont,
      });
      textEditorSheetRef.current?.present();
    }, [editor, fontSize, selectedFont, tokens.colors.textPrimary]),
    handleSelectSticker: useCallback((uri: string): void => {
      editor.addStickerLayer(uri);
      stickerSheetRef.current?.dismiss();
    }, [editor]),
  };
};
