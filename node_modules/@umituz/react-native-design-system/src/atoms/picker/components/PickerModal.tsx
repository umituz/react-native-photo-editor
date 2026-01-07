/**
 * PickerModal Component
 *
 * Modal component for AtomicPicker that handles the selection interface.
 * Extracted from AtomicPicker to follow single responsibility principle.
 *
 * Features:
 * - Search functionality
 * - Option list rendering
 * - Multi-select support
 * - Empty state handling
 */

import React from 'react';
import {
  View,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from '../../../safe-area';
import { useAppDesignTokens } from '../../../theme';
import { PickerOption } from '../types';
import { AtomicIcon } from '../../AtomicIcon';
import { AtomicText } from '../../AtomicText';
import {
  getModalOverlayStyles,
  getModalContainerStyles,
  getModalHeaderStyles,
  getModalTitleStyles,
  getSearchContainerStyles,
  getSearchInputStyles,
  getOptionContainerStyles,
  getOptionTextStyles,
  getOptionDescriptionStyles,
  getEmptyStateStyles,
  getEmptyStateTextStyles,
} from '../styles/pickerStyles';

/**
 * PickerModalProps
 *
 * IMPORTANT: String props are REQUIRED for proper i18n support.
 * Pass translated strings from your app's i18n system.
 */
interface PickerModalProps {
  visible: boolean;
  onClose: () => void;
  options: PickerOption[];
  selectedValues: string[];
  onSelect: (value: string) => void;
  title?: string;
  searchable?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredOptions: PickerOption[];
  multiple?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Close accessibility label */
  closeAccessibilityLabel?: string;
  testID?: string;
}

export const PickerModal: React.FC<PickerModalProps> = React.memo(({
  visible,
  onClose,
  selectedValues,
  onSelect,
  title,
  searchable = false,
  searchQuery,
  onSearchChange,
  filteredOptions,
  emptyMessage,
  searchPlaceholder,
  closeAccessibilityLabel,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const modalOverlayStyles = getModalOverlayStyles();
  const modalContainerStyles = getModalContainerStyles(tokens, 0);
  const modalHeaderStyles = getModalHeaderStyles(tokens);
  const modalTitleStyles = getModalTitleStyles(tokens);
  const searchContainerStyles = getSearchContainerStyles(tokens);
  const searchInputStyles = getSearchInputStyles(tokens);
  const emptyStateStyles = getEmptyStateStyles(tokens);
  const emptyStateTextStyles = getEmptyStateTextStyles(tokens);

  const safeSelectedValues = selectedValues ?? [];

  const isSelected = (optionValue: string): boolean => {
    return safeSelectedValues.includes(optionValue);
  };

  const renderOption = ({ item }: { item: PickerOption }) => {
    const selected = isSelected(item.value);
    const itemDisabled = item.disabled || false;

    const optionContainerStyle = getOptionContainerStyles(
      tokens,
      selected,
      itemDisabled
    );
    const optionTextStyle = getOptionTextStyles(tokens, selected);
    const optionDescriptionStyle = getOptionDescriptionStyles(tokens);

    return (
      <TouchableOpacity
        onPress={() => !itemDisabled && onSelect(item.value)}
        disabled={itemDisabled}
        testID={item.testID || `${testID}-option-${item.value}`}
        style={optionContainerStyle}
      >
        {/* Option Icon */}
        {item.icon && (
          <AtomicIcon
            name={item.icon}
            size="md"
            color={selected ? 'primary' : 'secondary'}
          />
        )}

        {/* Option Content */}
        <View style={{ flex: 1 }}>
          <AtomicText style={optionTextStyle}>{item.label}</AtomicText>
          {item.description && (
            <AtomicText style={optionDescriptionStyle}>
              {item.description}
            </AtomicText>
          )}
        </View>

        {/* Selected Indicator */}
        {selected && (
          <AtomicIcon name="CircleCheck" size="md" color="primary" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      testID={`${testID}-modal`}
    >
      <View style={modalOverlayStyles}>
        <View
          style={[
            modalContainerStyles,
            { paddingBottom: insets.bottom + tokens.spacing.md },
          ]}
        >
          {/* Modal Header */}
          <View style={modalHeaderStyles}>
            {/* Title */}
            <AtomicText style={modalTitleStyles}>
              {title || 'Select'}
            </AtomicText>

            {/* Close Button */}
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={closeAccessibilityLabel}
              testID={`${testID}-close`}
            >
              <AtomicIcon name="X" size="md" color="primary" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          {searchable && (
            <View style={searchContainerStyles}>
              <AtomicIcon name="Search" size="sm" color="secondary" />
              <TextInput
                value={searchQuery}
                onChangeText={onSearchChange}
                placeholder={searchPlaceholder}
                placeholderTextColor={tokens.colors.textSecondary}
                style={searchInputStyles}
                testID={`${testID}-search`}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => onSearchChange('')}>
                  <AtomicIcon name="X" size="sm" color="secondary" />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Options List */}
          {filteredOptions.length > 0 ? (
            <FlatList
              data={filteredOptions}
              keyExtractor={(item: PickerOption) => item.value}
              renderItem={renderOption}
              showsVerticalScrollIndicator
              testID={`${testID}-list`}
            />
          ) : (
            <View style={emptyStateStyles}>
              <AtomicIcon name="Info" size="xl" color="secondary" />
              <AtomicText style={emptyStateTextStyles}>
                {emptyMessage}
              </AtomicText>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
});
PickerModal.displayName = 'PickerModal';