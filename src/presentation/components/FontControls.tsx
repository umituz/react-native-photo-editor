/**
 * Font Controls Component
 * Font family and size controls
 */

import React, { memo } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, type ViewStyle } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { Slider } from "./ui/Slider";

const DEFAULT_FONTS = [
  "System",
  "Impact",
  "Comic",
  "Serif",
  "Retro",
];

interface FontControlsProps {
  fontSize: number;
  selectedFont: string;
  fonts?: readonly string[];
  onFontSizeChange: (size: number) => void;
  onFontSelect: (font: string) => void;
  style?: ViewStyle;
}

export const FontControls = memo<FontControlsProps>(({
  fontSize,
  selectedFont,
  fonts = DEFAULT_FONTS,
  onFontSizeChange,
  onFontSelect,
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={[styles.container, style]}>
      <Slider
        label="Font Size"
        value={fontSize}
        min={12}
        max={120}
        step={1}
        onValueChange={onFontSizeChange}
        formatValue={(v) => `${Math.round(v)}px`}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: tokens.spacing.sm }}
        contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm }}
      >
        {fonts.map((font) => (
          <TouchableOpacity
            key={font}
            style={[
              styles.fontButton,
              {
                backgroundColor: tokens.colors.surfaceVariant,
                borderWidth: selectedFont === font ? 2 : 1,
                borderColor: selectedFont === font ? tokens.colors.primary : tokens.colors.border,
              },
            ]}
            onPress={() => onFontSelect(font)}
            accessibilityLabel={`Font ${font}`}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedFont === font }}
          >
            <AtomicText
              style={{
                fontFamily: font === "System" ? undefined : font,
                color: selectedFont === font ? tokens.colors.primary : tokens.colors.textPrimary,
              }}
            >
              {font}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

FontControls.displayName = "FontControls";

const styles = StyleSheet.create({
  container: { gap: 8 },
  fontButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
});
