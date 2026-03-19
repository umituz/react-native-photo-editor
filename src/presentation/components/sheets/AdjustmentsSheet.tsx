/**
 * Adjustments Sheet Component
 * Bottom sheet for manual filter adjustments
 */

import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { Slider } from "../ui/Slider";
import { DEFAULT_FILTERS, type FilterValues } from "../../../domain/entities/Filters";

interface AdjustmentsSheetProps {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
}

export const AdjustmentsSheet = memo<AdjustmentsSheetProps>(({
  filters,
  onFiltersChange,
}) => {
  const tokens = useAppDesignTokens();

  const update = (key: keyof FilterValues, val: number) => {
    onFiltersChange({ ...filters, [key]: val });
  };

  const handleReset = () => onFiltersChange(DEFAULT_FILTERS);

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
        value={filters.brightness ?? 1}
        min={0.5}
        max={2}
        step={0.05}
        onValueChange={(v) => update("brightness", v)}
        formatValue={(v) => `${Math.round((v - 1) * 100) >= 0 ? "+" : ""}${Math.round((v - 1) * 100)}%`}
      />

      <Slider
        label="Contrast"
        value={filters.contrast ?? 1}
        min={0.5}
        max={2}
        step={0.05}
        onValueChange={(v) => update("contrast", v)}
        formatValue={(v) => `${Math.round((v - 1) * 100) >= 0 ? "+" : ""}${Math.round((v - 1) * 100)}%`}
      />

      <Slider
        label="Saturation"
        value={filters.saturation ?? 1}
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
        value={filters.sepia ?? 0}
        min={0}
        max={1}
        step={0.05}
        onValueChange={(v) => update("sepia", v)}
        formatValue={(v) => `${Math.round(v * 100)}%`}
      />
    </View>
  );
});

AdjustmentsSheet.displayName = "AdjustmentsSheet";
