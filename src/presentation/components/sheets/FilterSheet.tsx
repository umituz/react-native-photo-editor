/**
 * Filter Sheet Component
 * Bottom sheet for selecting preset filters
 */

import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface FilterOption {
  id: string;
  name: string;
  icon: string;
  filters: Record<string, number>;
}

interface FilterSheetProps {
  selectedFilter: string;
  onSelectFilter: (option: FilterOption) => void;
  filters?: FilterOption[];
}

export const DEFAULT_FILTERS: FilterOption[] = [
  {
    id: "none",
    name: "None",
    icon: "close",
    filters: { brightness: 1, contrast: 1, saturation: 1, sepia: 0, grayscale: 0 },
  },
  {
    id: "sepia",
    name: "Sepia",
    icon: "brush",
    filters: { sepia: 0.7, saturation: 0.8 },
  },
  {
    id: "grayscale",
    name: "B&W",
    icon: "swap-horizontal",
    filters: { grayscale: 1, saturation: 0 },
  },
  {
    id: "vintage",
    name: "Vintage",
    icon: "flash",
    filters: { sepia: 0.3, contrast: 1.1, brightness: 0.9 },
  },
  {
    id: "warm",
    name: "Warm",
    icon: "sparkles",
    filters: { brightness: 1.05, saturation: 1.2 },
  },
  {
    id: "cool",
    name: "Cool",
    icon: "image",
    filters: { contrast: 1.05, brightness: 1.02, saturation: 0.85 },
  },
];

export const FilterSheet = memo<FilterSheetProps>(({
  selectedFilter,
  onSelectFilter,
  filters = DEFAULT_FILTERS,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">Filters</AtomicText>
      <View style={styles.grid}>
        {filters.map((f) => {
          const isActive = selectedFilter === f.id;
          return (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.filter,
                {
                  backgroundColor: tokens.colors.surfaceVariant,
                  borderColor: isActive ? tokens.colors.primary : "transparent",
                },
              ]}
              onPress={() => onSelectFilter(f)}
              accessibilityLabel={f.name}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <AtomicIcon
                name={f.icon as "close"}
                size="lg"
                color={isActive ? "primary" : "textSecondary"}
              />
              <AtomicText
                type="labelSmall"
                color={isActive ? "primary" : "textSecondary"}
              >
                {f.name}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

FilterSheet.displayName = "FilterSheet";

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  filter: {
    width: 75,
    height: 75,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    gap: 4,
  },
});
