import React, { useMemo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { DEFAULT_FILTERS, type FilterOption } from "../constants";

interface FilterPickerProps {
  selectedFilter: string;
  onSelectFilter: (option: FilterOption) => void;
  filters?: FilterOption[];
}

export const FilterPicker: React.FC<FilterPickerProps> = ({
  selectedFilter,
  onSelectFilter,
  filters = DEFAULT_FILTERS,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
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
  }), [tokens]);

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">Filters</AtomicText>
      <View style={styles.grid}>
        {filters.map((f) => {
          const isActive = selectedFilter === f.id;
          return (
            <TouchableOpacity
              key={f.id}
              style={[styles.filter, isActive && styles.active]}
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
};

export default React.memo(FilterPicker);
