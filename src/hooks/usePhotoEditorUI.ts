import { useRef, useState, useCallback, useEffect } from "react";
import { BottomSheetModalRef, DesignTokens } from "@umituz/react-native-design-system";
import { usePhotoEditor } from "./usePhotoEditor";
import { TextLayer } from "../types";

export const usePhotoEditorUI = (
  initialCaption: string | undefined,
  tokens: DesignTokens,
) => {
  const textEditorSheetRef = useRef<BottomSheetModalRef>(null);
  const stickerSheetRef = useRef<BottomSheetModalRef>(null);
  const filterSheetRef = useRef<BottomSheetModalRef>(null);
  const layerSheetRef = useRef<BottomSheetModalRef>(null);
  const aiSheetRef = useRef<BottomSheetModalRef>(null);

  const [selectedFont, setSelectedFont] = useState<string>("System");
  const [fontSize, setFontSize] = useState(48);
  const [editingText, setEditingText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("none");

  const editor = usePhotoEditor([]);

  useEffect(() => {
    if (initialCaption) {
      const id = editor.addTextLayer(tokens);
      editor.updateLayer(id, { text: initialCaption });
    }
  }, [initialCaption]);

  const handleTextLayerTap = useCallback(
    (layerId: string) => {
      editor.selectLayer(layerId);
      const layer = editor.layers.find((l) => l.id === layerId);
      if (layer?.type === "text") {
        const textLayer = layer as TextLayer;
        setEditingText(textLayer.text || "");
        setFontSize(textLayer.fontSize || 48);
        textEditorSheetRef.current?.present();
      }
    },
    [editor],
  );

  const handleSaveText = useCallback(() => {
    if (editor.activeLayerId) {
      editor.updateLayer(editor.activeLayerId, {
        text: editingText,
        fontSize,
        fontFamily: selectedFont,
      });
    }
    textEditorSheetRef.current?.dismiss();
  }, [editor.activeLayerId, editingText, fontSize, selectedFont, editor.updateLayer]);

  return {
    ...editor,
    textEditorSheetRef,
    stickerSheetRef,
    filterSheetRef,
    layerSheetRef,
    aiSheetRef,
    selectedFont,
    setSelectedFont,
    fontSize,
    setFontSize,
    editingText,
    setEditingText,
    selectedFilter,
    handleTextLayerTap,
    handleSaveText,
    handleAddText: () => {
      editor.addTextLayer(tokens);
      textEditorSheetRef.current?.present();
    },
    handleSelectSticker: (s: string) => {
      editor.addStickerLayer(s);
      stickerSheetRef.current?.dismiss();
    },
    handleSelectFilter: (id: string, val: number) => {
      setSelectedFilter(id);
      editor.updateFilters({ ...editor.filters, [id]: val });
      filterSheetRef.current?.dismiss();
    }
  };
};
