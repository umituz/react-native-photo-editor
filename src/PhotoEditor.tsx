import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicIcon,
  BottomSheetModal,
  SafeBottomSheetModalProvider,
  useSafeAreaInsets,
  DesignTokens,
} from "@umituz/react-native-design-system";

import { EditorCanvas } from "./components/EditorCanvas";
import { EditorToolbar } from "./components/EditorToolbar";
import { FontControls } from "./components/FontControls";
import { LayerManager } from "./components/LayerManager";
import { TextEditorSheet } from "./components/TextEditorSheet";
import { StickerPicker } from "./components/StickerPicker";
import { FilterPicker } from "./components/FilterPicker";
import { AIMagicSheet } from "./components/AIMagicSheet";
import { createEditorStyles } from "./styles";
import { usePhotoEditorUI } from "./hooks/usePhotoEditorUI";
import { Layer } from "./types";
import { DEFAULT_FONTS } from "./constants";

export interface EditorActions {
  addTextLayer: (tokens: DesignTokens) => string;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  getLayers: () => Layer[];
  getActiveLayerId: () => string | null;
}

export interface PhotoEditorProps {
  imageUri: string;
  onSave?: (uri: string) => void;
  onClose: () => void;
  title?: string;
  customTools?: React.ReactNode | ((actions: EditorActions) => React.ReactNode);
  initialCaption?: string;
  t: (key: string) => string;
  fonts?: readonly string[];
  showAI?: boolean;
}

export const PhotoEditor: React.FC<PhotoEditorProps> = ({
  imageUri,
  onSave,
  onClose,
  title = "Photo Editor",
  customTools,
  initialCaption,
  t,
  fonts = DEFAULT_FONTS,
  showAI = true,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createEditorStyles(tokens, insets), [tokens, insets]);
  const ui = usePhotoEditorUI(initialCaption, tokens);

  const actions: EditorActions = useMemo(() => ({
    addTextLayer: ui.addTextLayer,
    updateLayer: ui.updateLayer,
    getLayers: () => ui.layers,
    getActiveLayerId: () => ui.activeLayerId,
  }), [ui.addTextLayer, ui.updateLayer, ui.layers, ui.activeLayerId]);

  return (
    <SafeBottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}><AtomicIcon name="close" size="md" color="textPrimary" /></TouchableOpacity>
          <AtomicText type="headlineSmall" style={styles.headerTitle}>{title}</AtomicText>
          <TouchableOpacity onPress={() => onSave?.(imageUri)}><AtomicText fontWeight="bold" color="primary">{t("common.save")}</AtomicText></TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <EditorCanvas imageUrl={imageUri} layers={ui.layers} activeLayerId={ui.activeLayerId} onLayerTap={ui.handleTextLayerTap} onLayerMove={(id, x, y) => ui.updateLayer(id, { x, y })} styles={styles} />
          {typeof customTools === "function" ? customTools(actions) : customTools}
          <FontControls fontSize={ui.fontSize} selectedFont={ui.selectedFont} fonts={fonts} onFontSizeChange={ui.setFontSize} onFontSelect={ui.setSelectedFont} styles={styles} />
        </ScrollView>

        <EditorToolbar onAddText={ui.handleAddText} onAddSticker={() => ui.stickerSheetRef.current?.present()} onOpenFilters={() => ui.filterSheetRef.current?.present()} onOpenLayers={() => ui.layerSheetRef.current?.present()} onAIMagic={showAI ? () => ui.aiSheetRef.current?.present() : undefined} styles={styles} t={t} />

        <BottomSheetModal ref={ui.textEditorSheetRef} snapPoints={["40%"]}><TextEditorSheet value={ui.editingText} onChange={ui.setEditingText} onSave={ui.handleSaveText} t={t} /></BottomSheetModal>
        <BottomSheetModal ref={ui.stickerSheetRef} snapPoints={["50%"]}><StickerPicker onSelectSticker={ui.handleSelectSticker} /></BottomSheetModal>
        <BottomSheetModal ref={ui.filterSheetRef} snapPoints={["40%"]}><FilterPicker selectedFilter={ui.selectedFilter} onSelectFilter={ui.handleSelectFilter} /></BottomSheetModal>
        <BottomSheetModal ref={ui.layerSheetRef} snapPoints={["50%"]}><LayerManager layers={ui.layers} activeLayerId={ui.activeLayerId} onSelectLayer={ui.selectLayer} onDeleteLayer={ui.deleteLayer} t={t} /></BottomSheetModal>
        <BottomSheetModal ref={ui.aiSheetRef} snapPoints={["60%"]}><AIMagicSheet onGenerateCaption={(_s) => { ui.aiSheetRef.current?.dismiss(); /* AI trigger */ }} /></BottomSheetModal>
      </View>
    </SafeBottomSheetModalProvider>
  );
};
