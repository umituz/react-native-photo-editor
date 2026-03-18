/**
 * Color Picker Component
 * Grid of color options
 */

import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

const DEFAULT_COLORS = [
  "#FFFFFF", "#000000", "#888888", "#CCCCCC",
  "#FF3B30", "#FF9500", "#FFCC00", "#FF2D55",
  "#34C759", "#30B0C7", "#007AFF", "#5AC8FA",
  "#5856D6", "#AF52DE", "#FF6B6B", "#FFD93D",
  "#6BCB77", "#4D96FF", "#C77DFF", "#F72585",
];

interface ColorPickerProps {
  label?: string;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  colors?: readonly string[];
}

export const ColorPicker = memo<ColorPickerProps>(({
  label,
  selectedColor,
  onSelectColor,
  colors = DEFAULT_COLORS,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      {label && (
        <AtomicText type="labelMedium" color="textSecondary" style={{ marginBottom: tokens.spacing.sm }}>
          {label}
        </AtomicText>
      )}
      <View style={styles.grid}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.color,
              {
                backgroundColor: color,
                borderWidth: selectedColor === color ? 3 : 1,
                borderColor: selectedColor === color ? tokens.colors.primary : "#E0E0E0",
              },
            ]}
            onPress={() => onSelectColor(color)}
            accessibilityLabel={`Color ${color}`}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedColor === color }}
          />
        ))}
      </View>
    </View>
  );
});

ColorPicker.displayName = "ColorPicker";

const styles = StyleSheet.create({
  container: { gap: 8 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  color: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
