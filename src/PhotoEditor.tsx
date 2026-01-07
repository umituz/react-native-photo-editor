import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  useAppDesignTokens,
  AtomicText,
  AtomicIcon,
  BottomSheetModal,
  SafeBottomSheetModalProvider,
  useSafeAreaInsets,
} from "@umituz/react-native-design-system";

import { EditorCanvas } from "./components/EditorCanvas";
import { EditorToolbar } from "./components/EditorToolbar";
import { FontControls } from "./components/FontControls";
import { StickerPicker } from "./components/StickerPicker";
import { FilterPicker } from "./components/FilterPicker";
import { LayerManager } from "./components/LayerManager";
import { TextEditorSheet } from "./components/TextEditorSheet";
import { createEditorStyles } from "./styles";
import { usePhotoEditorUI } from "./hooks/usePhotoEditorUI";

export interface PhotoEditorProps {
  imageUri: string;
  onSave?: (uri: string) => void;
  onClose: () => void;
  title?: string;
  onShare?: () => void;
  customTools?: React.ReactNode;
  initialCaption?: string;
  t: (key: string) => string;
}

const FONTS = ["Impact", "Comic", "Serif", "Retro"] as const;

export const PhotoEditor: React.FC<PhotoEditorProps> = ({
  imageUri,
  onSave,
  onClose,
  title = "Photo Editor",
  customTools,
  initialCaption,
  t,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createEditorStyles(tokens, insets), [tokens, insets]);

  const {
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
    // Actions
    updateLayer,
    deleteLayer,
    selectLayer,
    handleAddText,
    handleTextLayerTap,
    handleSaveText,
    handleSelectFilter,
    handleSelectSticker,
  } = usePhotoEditorUI(initialCaption, tokens);

  return (
    <SafeBottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={onClose}>
            <AtomicIcon name="close" size="md" color="textPrimary" />
          </TouchableOpacity>
          <AtomicText style={styles.headerTitle}>{title}</AtomicText>
          <TouchableOpacity style={styles.postButton} onPress={() => onSave?.(imageUri)}>
            <AtomicText style={styles.postButtonText}>{t("preview.share") || "Share"}</AtomicText>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <EditorCanvas
            imageUrl={imageUri}
            layers={layers}
            activeLayerId={activeLayerId}
            onLayerTap={handleTextLayerTap}
            onLayerMove={(id, x, y) => updateLayer(id, { x, y })}
            styles={styles}
          />
          {customTools}
          <FontControls
            fontSize={fontSize}
            selectedFont={selectedFont}
            fonts={FONTS}
            onFontSizeChange={(s) => setFontSize(Math.max(12, Math.min(96, s)))}
            onFontSelect={setSelectedFont}
            styles={styles}
          />
        </ScrollView>

        <EditorToolbar
          onAddText={handleAddText}
          onAddSticker={() => stickerSheetRef.current?.present()}
          onOpenFilters={() => filterSheetRef.current?.present()}
          onOpenLayers={() => layerSheetRef.current?.present()}
          styles={styles}
          t={t}
        />

        <BottomSheetModal ref={textEditorSheetRef} snapPoints={["40%"]}>
          <TextEditorSheet
            value={editingText}
            onChange={setEditingText}
            onSave={handleSaveText}
            t={t}
          />
        </BottomSheetModal>

        <BottomSheetModal ref={stickerSheetRef} snapPoints={["50%"]}>
          <StickerPicker onSelectSticker={handleSelectSticker} />
        </BottomSheetModal>

        <BottomSheetModal ref={filterSheetRef} snapPoints={["40%"]}>
          <FilterPicker selectedFilter={selectedFilter} onSelectFilter={handleSelectFilter} />
        </BottomSheetModal>

        <BottomSheetModal ref={layerSheetRef} snapPoints={["50%"]}>
          <LayerManager
            layers={layers}
            activeLayerId={activeLayerId}
            onSelectLayer={(id) => {
              selectLayer(id);
              layerSheetRef.current?.dismiss();
            }}
            onDeleteLayer={deleteLayer}
            t={t}
          />
        </BottomSheetModal>
      </View>
    </SafeBottomSheetModalProvider>
  );
};
