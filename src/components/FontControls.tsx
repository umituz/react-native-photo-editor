import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon, useAppDesignTokens } from "@umituz/react-native-design-system";

interface FontControlsProps {
  fontSize: number;
  selectedFont: string;
  fonts: readonly string[];
  onFontSizeChange: (size: number) => void;
  onFontSelect: (font: string) => void;
  styles: Record<string, object>;
}

export const FontControls: React.FC<FontControlsProps> = ({
  fontSize,
  selectedFont,
  fonts,
  onFontSizeChange,
  onFontSelect,
  styles: externalStyles,
}) => {
  const tokens = useAppDesignTokens();
  
  const styles = StyleSheet.create({
    btn: {
      padding: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      minWidth: 44,
      alignItems: "center",
    }
  });

  return (
    <View style={externalStyles.controlsPanel}>
      <View style={externalStyles.sliderRow}>
        <View style={externalStyles.sliderLabel}>
          <AtomicIcon name="text" size="sm" color="textSecondary" />
          <AtomicText type="labelMedium" color="textSecondary">Text Size</AtomicText>
        </View>
        <AtomicText fontWeight="bold" color="primary">{fontSize}px</AtomicText>
      </View>

      <View style={{ flexDirection: "row", gap: tokens.spacing.sm, marginBottom: tokens.spacing.md }}>
        <TouchableOpacity onPress={() => onFontSizeChange(fontSize - 4)} style={styles.btn}>
          <AtomicText fontWeight="bold">-</AtomicText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onFontSizeChange(fontSize + 4)} style={styles.btn}>
          <AtomicText fontWeight="bold">+</AtomicText>
        </TouchableOpacity>
      </View>

      <AtomicText type="labelMedium" color="textSecondary" style={{ marginBottom: tokens.spacing.xs }}>
        Font Style
      </AtomicText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={externalStyles.fontRow}>
          {fonts.map((font) => (
            <TouchableOpacity
              key={font}
              style={[externalStyles.fontChip, selectedFont === font && externalStyles.fontChipActive]}
              onPress={() => onFontSelect(font)}
            >
              <AtomicText
                fontWeight="bold"
                color={selectedFont === font ? "onPrimary" : "textSecondary"}
                style={{ fontFamily: font }}
              >
                {font}
              </AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(FontControls);
