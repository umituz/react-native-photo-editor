import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon, useAppDesignTokens } from "@umituz/react-native-design-system";
import { DEFAULT_FILTERS, type FilterOption } from "../constants";

interface FilterPickerProps {
  selectedFilter: string;
  onSelectFilter: (filterId: string, value: number) => void;
  filters?: readonly FilterOption[];
}

export const FilterPicker: React.FC<FilterPickerProps> = ({
  selectedFilter,
  onSelectFilter,
  filters = DEFAULT_FILTERS,
}) => {
  const tokens = useAppDesignTokens();

  const styles = StyleSheet.create({
    container: { padding: tokens.spacing.md, gap: tokens.spacing.md },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing.sm },
    filter: {
      width: 75,
      height: 75,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    active: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primary + "10",
    },
  });

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">Filters</AtomicText>
      <View style={styles.grid}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.filter, selectedFilter === f.id && styles.active]}
            onPress={() => onSelectFilter(f.id, f.value)}
          >
            <AtomicIcon
              name={f.icon as "close-circle" | "color-palette" | "contrast" | "time" | "sunny" | "snow"}
              size="lg"
              color={selectedFilter === f.id ? "primary" : "textSecondary"}
            />
            <AtomicText
              type="labelSmall"
              color={selectedFilter === f.id ? "primary" : "textSecondary"}
            >
              {f.name}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default React.memo(FilterPicker);
