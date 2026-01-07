import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

const FILTERS = [
  { id: "none", name: "None", icon: "close-circle" as const, value: 0 },
  { id: "sepia", name: "Sepia", icon: "color-palette" as const, value: 0.5 },
  { id: "grayscale", name: "B&W", icon: "contrast" as const, value: 1 },
  { id: "vintage", name: "Vintage", icon: "time" as const, value: 0.7 },
  { id: "warm", name: "Warm", icon: "sunny" as const, value: 0.3 },
  { id: "cool", name: "Cool", icon: "snow" as const, value: 0.3 },
] as const;

interface FilterPickerProps {
  selectedFilter: string;
  onSelectFilter: (filterId: string, value: number) => void;
}

export const FilterPicker: React.FC<FilterPickerProps> = ({
  selectedFilter,
  onSelectFilter,
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
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filter,
              selectedFilter === filter.id && styles.filterActive,
            ]}
            onPress={() => onSelectFilter(filter.id, filter.value)}
          >
            <AtomicIcon
              name={filter.icon}
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
