/**
 * Photo Editor Component
 * Main entry point for the photo editor
 */

import React, { useCallback, useMemo } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { BottomSheetModal } from "@umituz/react-native-design-system/molecules";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useSafeAreaInsets } from "@umituz/react-native-design-system/safe-area";

import { EditorCanvas } from "./presentation/components/EditorCanvas";
import { EditorToolbar } from "./presentation/components/EditorToolbar";
import { FontControls } from "./presentation/components/FontControls";
import { TextEditorSheet } from "./presentation/components/sheets/TextEditorSheet";
import { StickerPicker } from "./presentation/components/sheets/StickerPicker";
import { FilterSheet } from "./presentation/components/sheets/FilterSheet";
import { AdjustmentsSheet } from "./presentation/components/sheets/AdjustmentsSheet";
import { LayerManager } from "./presentation/components/sheets/LayerManager";
import { AIMagicSheet } from "./presentation/components/sheets/AIMagicSheet";
import { useEditorUI } from "./application/hooks/useEditorUI";
import { DEFAULT_FONTS } from "./constants";

export interface PhotoEditorProps {
  imageUri: string;
  onSave?: (uri: string, layers: any[], filters: Record<string, number>) => void;
  onClose: () => void;
  title?: string;
  customTools?: React.ReactNode | ((ui: ReturnType<typeof useEditorUI>) => React.ReactNode);
  initialCaption?: string;
  t: (key: string) => string;
  fonts?: readonly string[];
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
  const ui = useEditorUI(initialCaption);

  const styles = useMemo(() => ({
    container: {
      flex: 1,
      backgroundColor: tokens.colors.surface,
      paddingTop: insets.top,
    },
    header: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.border,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
    },
    scrollContent: {
      padding: tokens.spacing.md,
      gap: tokens.spacing.md,
    },
  }), [tokens, insets]);

  const handleSave = useCallback(
    () => onSave?.(imageUri, ui.layers.map(l => l.toJSON()), ui.filters),
    [onSave, imageUri, ui.layers, ui.filters],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} accessibilityLabel="Close editor" accessibilityRole="button">
          <AtomicIcon name="close" size="md" color="textPrimary" />
        </TouchableOpacity>
        <AtomicText type="headlineSmall" style={styles.headerTitle}>
          {title}
        </AtomicText>
        <TouchableOpacity onPress={handleSave} accessibilityLabel="Save" accessibilityRole="button">
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
        />

        {typeof customTools === "function" ? customTools(ui) : customTools}

        <FontControls
          fontSize={ui.fontSize}
          selectedFont={ui.selectedFont}
          fonts={fonts}
          onFontSizeChange={ui.setFontSize}
          onFontSelect={ui.setSelectedFont}
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
        <FilterSheet
          selectedFilter={ui.selectedFilter}
          onSelectFilter={(option) => {
            ui.setSelectedFilter(option.id);
            ui.updateFilters(option.filters);
            ui.filterSheetRef.current?.dismiss();
          }}
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

export default PhotoEditor;
