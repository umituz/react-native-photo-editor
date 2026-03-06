import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { DEFAULT_TEXT_COLORS } from "../constants";

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  label?: string;
  colors?: readonly string[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
  label,
  colors = DEFAULT_TEXT_COLORS,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={{ gap: tokens.spacing.xs }}>
      {label && (
        <AtomicText type="labelMedium" color="textSecondary">
          {label}
        </AtomicText>
      )}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: tokens.spacing.xs,
        }}
      >
        {colors.map((color) => {
          const isSelected = selectedColor === color;
          return (
            <TouchableOpacity
              key={color}
              onPress={() => onSelectColor(color)}
              accessibilityLabel={`Color ${color}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: color,
                borderWidth: isSelected ? 3 : 1.5,
                borderColor: isSelected
                  ? tokens.colors.primary
                  : tokens.colors.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSelected && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor:
                      color === "#FFFFFF" ? "#000000" : "#FFFFFF",
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(ColorPicker);
