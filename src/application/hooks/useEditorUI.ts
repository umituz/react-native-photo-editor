/**
 * Use Editor UI Hook
 * UI-specific state management (fonts, sheets, editing state)
 */

import { useState, useRef, useCallback, useEffect } from "react";
import type { BottomSheetModalRef } from "@umituz/react-native-design-system/molecules";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useEditor } from "./useEditor";
import type { TextAlign } from "../../domain/types";
import type { Transform } from "../../domain/entities/Transform";

export function useEditorUI(initialCaption?: string) {
  const tokens = useAppDesignTokens();
  const editor = useEditor();

  // Bottom sheet refs
  const textEditorSheetRef = useRef<BottomSheetModalRef>(null);
  const stickerSheetRef = useRef<BottomSheetModalRef>(null);
  const filterSheetRef = useRef<BottomSheetModalRef>(null);
  const adjustmentsSheetRef = useRef<BottomSheetModalRef>(null);
  const layerSheetRef = useRef<BottomSheetModalRef>(null);
  const aiSheetRef = useRef<BottomSheetModalRef>(null);

  // Font/size state
  const [selectedFont, setSelectedFont] = useState<string>("System");
  const [fontSize, setFontSize] = useState(48);

  // Text editing state
  const [editingText, setEditingText] = useState("");
  const [editingColor, setEditingColor] = useState<string>(tokens.colors.textPrimary);
  const [editingAlign, setEditingAlign] = useState<TextAlign>("center");
  const [editingBold, setEditingBold] = useState(false);
  const [editingItalic, setEditingItalic] = useState(false);

  // Filter state
  const [selectedFilter, setSelectedFilter] = useState("none");

  // Apply initial caption
  const prevInitialCaptionRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (initialCaption && initialCaption !== prevInitialCaptionRef.current) {
      prevInitialCaptionRef.current = initialCaption;
      editor.addTextLayer({
        text: initialCaption,
        color: tokens.colors.textPrimary,
      });
    }
  }, [initialCaption, editor]);

  // Handle text layer tap
  const handleTextLayerTap = useCallback((layerId: string) => {
    editor.selectLayer(layerId);
    const layer = editor.layers.find((l: { id: string }) => l.id === layerId);
    if (layer && layer.isText()) {
      setEditingText(layer.text ?? "");
      setFontSize(layer.fontSize ?? 48);
      setEditingColor(layer.color ?? tokens.colors.textPrimary);
      setEditingAlign(layer.textAlign ?? "center");
      setEditingBold(layer.isBold ?? false);
      setEditingItalic(layer.isItalic ?? false);
      textEditorSheetRef.current?.present();
    }
  }, [editor, tokens.colors.textPrimary]);

  // Handle save text
  const handleSaveText = useCallback(() => {
    if (editor.activeLayerId && editor.activeLayer?.isText()) {
      editor.updateTextLayerContent(editor.activeLayerId, {
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
  }, [editor, editingText, fontSize, selectedFont, editingColor, editingAlign, editingBold, editingItalic]);

  // Handle add text
  const handleAddText = useCallback(() => {
    const color = tokens.colors.textPrimary;
    setEditingText("");
    setEditingColor(color);
    setEditingAlign("center");
    setEditingBold(false);
    setEditingItalic(false);
    editor.addTextLayer({ fontSize, fontFamily: selectedFont, color });
    textEditorSheetRef.current?.present();
  }, [editor, fontSize, selectedFont, tokens.colors.textPrimary]);

  // Handle select sticker
  const handleSelectSticker = useCallback((uri: string) => {
    editor.addStickerLayer(uri);
    stickerSheetRef.current?.dismiss();
  }, [editor]);

  // Handle layer transform
  const handleLayerTransform = useCallback((layerId: string, transform: Partial<Transform>) => {
    editor.updateLayer(layerId, transform);
  }, [editor]);

  return {
    // Editor state
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
    setSelectedFilter,

    // Handlers
    handleTextLayerTap,
    handleSaveText,
    handleAddText,
    handleSelectSticker,
    handleLayerTransform,
  };
}

export type EditorUIState = ReturnType<typeof useEditorUI>;
