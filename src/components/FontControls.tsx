import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface FontControlsProps {
  fontSize: number;
  selectedFont: string;
  fonts: readonly string[];
  onFontSizeChange: (size: number) => void;
  onFontSelect: (font: string) => void;
  styles: {
    controlsPanel: object;
    fontRow: object;
    fontChip: object;
    fontChipActive: object;
    [key: string]: object;
  };
}

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 128;
const FONT_SIZE_STEP = 4;

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
    stepRow: {
      flexDirection: "row",
      gap: tokens.spacing.sm,
      marginBottom: tokens.spacing.md,
    },
    stepBtn: {
      padding: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.border,
      minWidth: 44,
      alignItems: "center",
    },
    sizeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: tokens.spacing.sm,
    },
    sizeLabel: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.xs,
    },
  });

  return (
    <View style={externalStyles.controlsPanel}>
      <View style={styles.sizeRow}>
        <View style={styles.sizeLabel}>
          <AtomicIcon name="edit" size="sm" color="textSecondary" />
          <AtomicText type="labelMedium" color="textSecondary">
            Text Size
          </AtomicText>
        </View>
        <AtomicText fontWeight="bold" color="primary">
          {fontSize}px
        </AtomicText>
      </View>

      <View style={styles.stepRow}>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => onFontSizeChange(Math.max(MIN_FONT_SIZE, fontSize - FONT_SIZE_STEP))}
          accessibilityLabel="Decrease font size"
          accessibilityRole="button"
        >
          <AtomicText fontWeight="bold">−</AtomicText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => onFontSizeChange(Math.min(MAX_FONT_SIZE, fontSize + FONT_SIZE_STEP))}
          accessibilityLabel="Increase font size"
          accessibilityRole="button"
        >
          <AtomicText fontWeight="bold">+</AtomicText>
        </TouchableOpacity>
      </View>

      <AtomicText
        type="labelMedium"
        color="textSecondary"
        style={{ marginBottom: tokens.spacing.xs }}
      >
        Font Style
      </AtomicText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={externalStyles.fontRow}>
          {fonts.map((font) => (
            <TouchableOpacity
              key={font}
              style={[
                externalStyles.fontChip,
                selectedFont === font && externalStyles.fontChipActive,
              ]}
              onPress={() => onFontSelect(font)}
              accessibilityLabel={`Font: ${font}`}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedFont === font }}
            >
              <AtomicText
                fontWeight="bold"
                color={selectedFont === font ? "onPrimary" : "textSecondary"}
                style={{ fontFamily: font === "System" ? undefined : font }}
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
