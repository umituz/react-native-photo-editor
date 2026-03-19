/**
 * Photo Editor Component
 * Main entry point for the photo editor
 */

import React, { useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "@umituz/react-native-design-system/safe-area";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { EditorHeader } from "./presentation/components/EditorHeader";
import { EditorContent } from "./presentation/components/EditorContent";
import { EditorSheets } from "./presentation/components/EditorSheets";
import { EditorToolbar } from "./presentation/components/EditorToolbar";
import { useEditorUI } from "./application/hooks/useEditorUI";
import { DEFAULT_FONTS } from "./utils/constants";
import type { Layer } from "./domain/entities/Layer.entity";
import type { FilterSettings } from "./domain/value-objects/FilterSettings.vo";

export interface PhotoEditorProps {
  imageUri: string;
  onSave?: (uri: string, layers: Layer[], filters: FilterSettings) => void;
  onClose: () => void;
  title?: string;
  customTools?: React.ReactNode | ((ui: unknown) => React.ReactNode);
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

  const styles = useMemo(
    () => ({
      container: {
        flex: 1,
        backgroundColor: tokens.colors.surface,
        paddingTop: insets.top,
      },
    }),
    [tokens, insets]
  );

  const handleSave = () =>
    onSave?.(imageUri, ui.layers, ui.filters);

  return (
    <View style={styles.container}>
      <EditorHeader
        title={title}
        saveLabel={t("common.save") || "Save"}
        onClose={onClose}
        onSave={handleSave}
      />

      <EditorContent
        imageUrl={imageUri}
        layers={ui.layers}
        filters={ui.filters}
        activeLayerId={ui.activeLayerId}
        selectedFont={ui.selectedFont}
        fontSize={ui.fontSize}
        fonts={fonts}
        customTools={customTools}
        ui={ui}
        onFontSizeChange={ui.setFontSize}
        onFontSelect={ui.setSelectedFont}
      />

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

      <EditorSheets ui={ui} filters={ui.filters} t={t} onAICaption={onAICaption} />
    </View>
  );
}

export default PhotoEditor;
