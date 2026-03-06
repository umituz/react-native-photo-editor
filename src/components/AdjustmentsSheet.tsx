import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { Slider } from "./Slider";
import { ImageFilters, DEFAULT_IMAGE_FILTERS } from "../types";

interface AdjustmentsSheetProps {
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
}

export const AdjustmentsSheet: React.FC<AdjustmentsSheetProps> = ({
  filters,
  onFiltersChange,
}) => {
  const tokens = useAppDesignTokens();

  const update = (key: keyof ImageFilters, val: number) => {
    onFiltersChange({ ...filters, [key]: val });
  };

  const handleReset = () => onFiltersChange(DEFAULT_IMAGE_FILTERS);

  return (
    <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.lg }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing.sm }}>
          <AtomicIcon name="brush" size="md" color="primary" />
          <AtomicText type="headlineSmall">Adjustments</AtomicText>
        </View>
        <TouchableOpacity
          onPress={handleReset}
          accessibilityLabel="Reset adjustments"
          accessibilityRole="button"
          style={{
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            backgroundColor: tokens.colors.surfaceVariant,
            borderRadius: tokens.borders.radius.sm,
          }}
        >
          <AtomicText type="labelSmall" color="textSecondary">
            Reset
          </AtomicText>
        </TouchableOpacity>
      </View>

      <Slider
        label="Brightness"
        value={filters.brightness}
        min={0.5}
        max={2}
        step={0.05}
        onValueChange={(v) => update("brightness", v)}
        formatValue={(v) => `${Math.round((v - 1) * 100) >= 0 ? "+" : ""}${Math.round((v - 1) * 100)}%`}
      />

      <Slider
        label="Contrast"
        value={filters.contrast}
        min={0.5}
        max={2}
        step={0.05}
        onValueChange={(v) => update("contrast", v)}
        formatValue={(v) => `${Math.round((v - 1) * 100) >= 0 ? "+" : ""}${Math.round((v - 1) * 100)}%`}
      />

      <Slider
        label="Saturation"
        value={filters.saturation}
        min={0}
        max={2}
        step={0.05}
        onValueChange={(v) => update("saturation", v)}
        formatValue={(v) => `${Math.round((v - 1) * 100) >= 0 ? "+" : ""}${Math.round((v - 1) * 100)}%`}
      />

      <Slider
        label="Hue Rotate"
        value={filters.hueRotate ?? 0}
        min={0}
        max={360}
        step={1}
        onValueChange={(v) => update("hueRotate", v)}
        formatValue={(v) => `${Math.round(v)}°`}
      />

      <Slider
        label="Sepia"
        value={filters.sepia}
        min={0}
        max={1}
        step={0.05}
        onValueChange={(v) => update("sepia", v)}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
    </View>
  );
};

export default React.memo(AdjustmentsSheet);
