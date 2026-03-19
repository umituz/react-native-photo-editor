/**
 * Editor Content Component
 * Scrollable content area with canvas and tools
 */

import React from "react";
import { ScrollView } from "react-native";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { EditorCanvas } from "./EditorCanvas";
import { FontControls } from "./FontControls";
import type { Layer } from "../entities/Layer.entity".entity";
import type { FilterSettings } from "../../domain/value-objects/FilterSettings.vo";
import type { EditorUIState } from "../../application/hooks/useEditorUI";

interface EditorContentProps {
  imageUrl: string;
  layers: Layer[];
  filters: FilterSettings;
  activeLayerId: string | null;
  selectedFont: string;
  fontSize: number;
  fonts: readonly string[];
  customTools?: React.ReactNode | ((ui: EditorUIState) => React.ReactNode);
  ui: EditorUIState;
  onFontSizeChange: (size: number) => void;
  onFontSelect: (font: string) => void;
}

export function EditorContent({
  imageUrl,
  layers,
  filters,
  activeLayerId,
  selectedFont,
  fontSize,
  fonts,
  customTools,
  ui,
  onFontSizeChange,
  onFontSelect,
}: EditorContentProps) {
  const tokens = useAppDesignTokens();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: tokens.spacing.md,
        gap: tokens.spacing.md,
      }}
    >
      <EditorCanvas
        imageUrl={imageUrl}
        layers={layers}
        activeLayerId={activeLayerId}
        filters={filters}
        onLayerTap={ui.handleTextLayerTap}
        onLayerTransform={ui.handleLayerTransform}
      />

      {typeof customTools === "function" ? customTools(ui) : customTools}

      <FontControls
        fontSize={fontSize}
        selectedFont={selectedFont}
        fonts={fonts}
        onFontSizeChange={onFontSizeChange}
        onFontSelect={onFontSelect}
      />
    </ScrollView>
  );
}

