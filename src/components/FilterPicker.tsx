import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { DEFAULT_FILTERS, type FilterType } from "../constants";

interface FilterOption {
  id: FilterType;
  name: string;
  icon: string;
  value: number;
}

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
    container: { padding: 16 },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: tokens.colors.textPrimary,
      marginBottom: 16,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    filter: {
      width: 80,
      height: 80,
      borderRadius: 12,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: "transparent",
    },
    filterActive: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primaryContainer,
    },
    filterName: {
      marginTop: 4,
      fontSize: 12,
      color: tokens.colors.textSecondary,
    },
    filterNameActive: { color: tokens.colors.primary },
  });

  return (
    <View style={styles.container}>
      <AtomicText style={styles.title}>Filters</AtomicText>
      <View style={styles.grid}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filter,
              selectedFilter === filter.id && styles.filterActive,
            ]}
            onPress={() => onSelectFilter(filter.id, filter.value)}
          >
            <AtomicIcon
              name={filter.icon as "close-circle" | "color-palette" | "contrast" | "time" | "sunny" | "snow"}
              size="lg"
              color={selectedFilter === filter.id ? "primary" : "textSecondary"}
            />
            <AtomicText
              style={[
                styles.filterName,
                selectedFilter === filter.id && styles.filterNameActive,
              ]}
            >
              {filter.name}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default React.memo(FilterPicker);
