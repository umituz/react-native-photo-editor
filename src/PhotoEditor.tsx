import React, { useMemo, useCallback } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { BottomSheetModal } from "@umituz/react-native-design-system/molecules";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useSafeAreaInsets } from "@umituz/react-native-design-system/safe-area";

import EditorCanvas from "./components/EditorCanvas";
import { EditorToolbar } from "./components/EditorToolbar";
import { FontControls } from "./components/FontControls";
import { LayerManager } from "./components/LayerManager";
import { TextEditorSheet } from "./components/TextEditorSheet";
import { StickerPicker } from "./components/StickerPicker";
import { FilterPicker } from "./components/FilterPicker";
import { AdjustmentsSheet } from "./components/AdjustmentsSheet";
import { AIMagicSheet } from "./components/AIMagicSheet";
import { createEditorStyles } from "./styles";
import { usePhotoEditorUI } from "./hooks/usePhotoEditorUI";
import { Layer, ImageFilters } from "./types";
import { DEFAULT_FONTS } from "./constants";

export interface PhotoEditorProps {
  imageUri: string;
  /**
   * Called when the user taps Save.
   * Receives the original imageUri, current layers, and active filters
   * so the host app can composite/export however it needs.
   */
  onSave?: (uri: string, layers: Layer[], filters: ImageFilters) => void;
  onClose: () => void;
  title?: string;
  /** Render extra tools below the canvas. Receives editor state helpers. */
  customTools?: React.ReactNode | ((ui: ReturnType<typeof usePhotoEditorUI>) => React.ReactNode);
  initialCaption?: string;
  t: (key: string) => string;
  fonts?: readonly string[];
  /** Pass a handler to enable the AI caption feature */
  onAICaption?: (style: string) => Promise<string> | void;
}

export function PhotoEditor({
  imageUri,
  onSave,
  onClose,
  title = "Photo Editor",
  customTools,
  initialCaption,
  t,
  fonts = DEFAULT_FONTS,
  onAICaption,
}: PhotoEditorProps) {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createEditorStyles(tokens, insets),
    [tokens, insets],
  );
  const ui = usePhotoEditorUI(initialCaption);

  const handleSave = useCallback(
    () => onSave?.(imageUri, ui.layers, ui.filters),
    [onSave, imageUri, ui.layers, ui.filters],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onClose}
          accessibilityLabel="Close editor"
          accessibilityRole="button"
        >
          <AtomicIcon name="close" size="md" color="textPrimary" />
        </TouchableOpacity>
        <AtomicText type="headlineSmall" style={styles.headerTitle}>
          {title}
        </AtomicText>
        <TouchableOpacity
          onPress={handleSave}
          accessibilityLabel="Save"
          accessibilityRole="button"
        >
          <AtomicText fontWeight="bold" color="primary">
            {t("common.save") || "Save"}
          </AtomicText>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <EditorCanvas
          imageUrl={imageUri}
          layers={ui.layers}
          activeLayerId={ui.activeLayerId}
          filters={ui.filters}
          onLayerTap={ui.handleTextLayerTap}
          onLayerTransform={ui.handleLayerTransform}
          styles={styles}
        />

        {typeof customTools === "function" ? customTools(ui) : customTools}

        <FontControls
          fontSize={ui.fontSize}
          selectedFont={ui.selectedFont}
          fonts={fonts}
          onFontSizeChange={ui.setFontSize}
          onFontSelect={ui.setSelectedFont}
          styles={styles}
        />
      </ScrollView>

      <EditorToolbar
        onAddText={ui.handleAddText}
        onAddSticker={() => ui.stickerSheetRef.current?.present()}
        onOpenFilters={() => ui.filterSheetRef.current?.present()}
        onOpenAdjustments={() => ui.adjustmentsSheetRef.current?.present()}
        onOpenLayers={() => ui.layerSheetRef.current?.present()}
        onAIMagic={onAICaption ? () => ui.aiSheetRef.current?.present() : undefined}
        onUndo={ui.undo}
        onRedo={ui.redo}
        canUndo={ui.canUndo}
        canRedo={ui.canRedo}
        styles={styles}
        t={t}
      />

      {/* Bottom Sheets */}
      <BottomSheetModal ref={ui.textEditorSheetRef} snapPoints={["55%"]}>
        <TextEditorSheet
          value={ui.editingText}
          onChange={ui.setEditingText}
          onSave={ui.handleSaveText}
          t={t}
          color={ui.editingColor}
          onColorChange={ui.setEditingColor}
          textAlign={ui.editingAlign}
          onTextAlignChange={ui.setEditingAlign}
          isBold={ui.editingBold}
          onBoldChange={ui.setEditingBold}
          isItalic={ui.editingItalic}
          onItalicChange={ui.setEditingItalic}
        />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.stickerSheetRef} snapPoints={["50%"]}>
        <StickerPicker onSelectSticker={ui.handleSelectSticker} />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.filterSheetRef} snapPoints={["40%"]}>
        <FilterPicker
          selectedFilter={ui.selectedFilter}
          onSelectFilter={ui.handleSelectFilter}
        />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.adjustmentsSheetRef} snapPoints={["55%"]}>
        <AdjustmentsSheet
          filters={ui.filters}
          onFiltersChange={ui.updateFilters}
        />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.layerSheetRef} snapPoints={["55%"]}>
        <LayerManager
          layers={ui.layers}
          activeLayerId={ui.activeLayerId}
          onSelectLayer={ui.selectLayer}
          onDeleteLayer={ui.deleteLayer}
          onDuplicateLayer={ui.duplicateLayer}
          onMoveLayerUp={ui.moveLayerUp}
          onMoveLayerDown={ui.moveLayerDown}
          t={t}
        />
      </BottomSheetModal>

      {onAICaption && (
        <BottomSheetModal ref={ui.aiSheetRef} snapPoints={["60%"]}>
          <AIMagicSheet onGenerateCaption={onAICaption} />
        </BottomSheetModal>
      )}
    </View>
  );
}
