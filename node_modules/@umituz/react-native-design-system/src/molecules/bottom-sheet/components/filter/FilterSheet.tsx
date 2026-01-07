import React, { useCallback } from "react";
import { View, StyleSheet, ScrollView, Modal, Pressable, GestureResponderEvent } from "react-native";
import { useSafeAreaInsets } from "../../../../safe-area";
import { AtomicButton } from '../../../../atoms';
import { useAppDesignTokens } from '../../../../theme';
import type { FilterOption } from "../../types/Filter";
import { FilterUtils } from "../../types/Filter";
import { FilterSheetHeader } from "./FilterSheetComponents/FilterSheetHeader";
import { FilterSheetOption } from "./FilterSheetComponents/FilterSheetOption";

export interface FilterSheetProps {
  visible: boolean;
  options: FilterOption[];
  selectedIds: string[];
  onFilterPress: (filterId: string) => void;
  onClearFilters: () => void;
  onClose?: () => void;
  defaultFilterId?: string;
  title?: string;
  clearLabel?: string;
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  visible,
  options,
  selectedIds,
  onFilterPress,
  onClearFilters,
  onClose,
  defaultFilterId = "all",
  title,
  clearLabel = "Clear"
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const safeSelectedIds = selectedIds ?? [];
  const hasActiveFilter = FilterUtils.hasActiveFilter(safeSelectedIds, defaultFilterId);

  const handleFilterPressWithClose = useCallback((id: string) => {
    onFilterPress(id);
    onClose?.();
  }, [onFilterPress, onClose]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[styles.sheet, { backgroundColor: tokens.colors.surface, paddingBottom: insets.bottom }]}
          onPress={(e: GestureResponderEvent) => e.stopPropagation()}
        >
          <View style={[styles.handle, { backgroundColor: tokens.colors.border }]} />

          <FilterSheetHeader
            title={title || "Filter"}
            onClose={() => onClose?.()}
            tokens={tokens}
          />

          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {options.map((option) => (
              <FilterSheetOption
                key={option.id}
                option={option}
                isSelected={safeSelectedIds.includes(option.id)}
                onPress={handleFilterPressWithClose}
                tokens={tokens}
              />
            ))}
          </ScrollView>

          {hasActiveFilter && (
            <View style={[styles.footer, { borderTopColor: tokens.colors.border, borderTopWidth: tokens.borders.width.thin }]}>
              <AtomicButton variant="outline" onPress={onClearFilters} fullWidth>
                {clearLabel}
              </AtomicButton>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

FilterSheet.displayName = "FilterSheet";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  optionsList: {
    maxHeight: 400,
    paddingVertical: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
});


