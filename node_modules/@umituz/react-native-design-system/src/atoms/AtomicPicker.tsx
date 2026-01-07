/**
 * AtomicPicker Component
 *
 * A reusable option picker/dropdown component for selecting from a list of options.
 *
 * Features:
 * - Single and multi-select support
 * - Modal display mode (full-screen on mobile)
 * - Optional search/filter capability
 * - Error and disabled states
 * - Theme-aware styling
 * - Icons for options
 * - Clearable selection
 * - react-hook-form integration ready
 *
 * Architecture:
 * - Follows AtomicButton pattern with separated types and styles
 * - Uses helper functions from picker/styles/pickerStyles.ts
 * - Types defined in picker/types/index.ts
 * - Zero inline StyleSheet.create()
 *
 * Usage:
 * ```tsx
 * const [partyType, setPartyType] = useState('birthday');
 *
 * <AtomicPicker
 *   value={partyType}
 *   onChange={setPartyType}
 *   options={[
 *     { label: 'Birthday Party', value: 'birthday', icon: 'cake' },
 *     { label: 'Wedding', value: 'wedding', icon: 'heart' },
 *     { label: 'Corporate Event', value: 'corporate', icon: 'briefcase' },
 *   ]}
 *   label="Party Type"
 *   placeholder="Select party type"
 *   searchable
 * />
 * ```
 *
 * @module AtomicPicker
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicPickerProps } from './picker/types';
import { AtomicIcon } from './AtomicIcon';
import { AtomicText } from './AtomicText';
import { PickerModal } from './picker/components/PickerModal';
import { PickerChips } from './picker/components/PickerChips';
import {
  getPickerContainerStyles,
  getPickerLabelStyles,
  getPickerPlaceholderStyles,
  getPickerValueStyles,
  getPickerErrorStyles,
} from './picker/styles/pickerStyles';

export type { AtomicPickerProps, PickerOption, PickerSize } from './picker/types';

/**
 * AtomicPicker - Universal option picker component
 *
 * Displays a button that opens a modal for selection.
 * Supports single/multi-select, search, and custom rendering.
 */
export const AtomicPicker: React.FC<AtomicPickerProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  autoClose = true,
  size = 'md',
  modalTitle,
  emptyMessage,
  searchPlaceholder,
  clearAccessibilityLabel,
  closeAccessibilityLabel,
  style,
  labelStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get style helpers with design tokens
  const containerStyles = getPickerContainerStyles(tokens);
  const labelStyles = getPickerLabelStyles(tokens);
  const placeholderStyles = getPickerPlaceholderStyles(tokens);
  const valueStyles = getPickerValueStyles(tokens);
  const errorStyles = getPickerErrorStyles(tokens);

  /**
   * Normalize value to array for consistent handling
   */
  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value as string] : [];
  }, [value, multiple]);

  /**
   * Get selected option objects
   */
  const selectedOptions = useMemo(() => {
    return options.filter((opt) => selectedValues.includes(opt.value));
  }, [options, selectedValues]);

  /**
   * Filter options based on search query
   */
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.description?.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  /**
   * Format display text for selected value(s)
   */
  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    if (multiple) {
      return selectedOptions.length === 1
        ? selectedOptions[0]?.label || placeholder
        : `${selectedOptions.length} selected`;
    }
    return selectedOptions[0]?.label || placeholder;
  }, [selectedOptions, placeholder, multiple]);

  /**
   * Handle modal open
   */
  const openModal = () => {
    if (disabled) return;
    setModalVisible(true);
    setSearchQuery('');
  };

  /**
   * Handle modal close
   */
  const closeModal = () => {
    setModalVisible(false);
    setSearchQuery('');
  };

  /**
   * Handle option selection
   */
  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      if (autoClose) {
        closeModal();
      }
    }
  };

  /**
   * Handle clear selection
   */
  const handleClear = () => {
    onChange(multiple ? [] : '');
  };

  /**
   * Handle search query change
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };



  /**
   * Handle chip removal
   */
  const handleChipRemove = (value: string) => {
    handleSelect(value);
  };

  const pickerContainerStyle = StyleSheet.flatten([
    containerStyles.base,
    containerStyles.size[size],
    error ? containerStyles.state.error : undefined,
    disabled ? containerStyles.state.disabled : undefined,
    style,
  ]);

  const pickerLabelStyle = StyleSheet.flatten([
    labelStyles.base,
    labelStyles.size[size],
    labelStyle,
  ]);

  const pickerValueStyle = StyleSheet.flatten([
    selectedOptions.length > 0 ? valueStyles.base : placeholderStyles.base,
    selectedOptions.length > 0
      ? valueStyles.size[size]
      : placeholderStyles.size[size],
  ]);

  return (
    <View>
      {/* Label */}
      {label && <AtomicText style={pickerLabelStyle}>{label}</AtomicText>}

      {/* Picker Button */}
      <TouchableOpacity
        onPress={openModal}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityState={{ disabled }}
        testID={testID}
        style={pickerContainerStyle}
      >
        {/* Display Text */}
        <AtomicText style={pickerValueStyle} numberOfLines={1}>
          {displayText}
        </AtomicText>

        {/* Icons */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {/* Clear Button */}
          {clearable && selectedOptions.length > 0 && !disabled && (
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityRole="button"
              accessibilityLabel={clearAccessibilityLabel}
              testID={`${testID}-clear`}
            >
              <AtomicIcon name="X" size="sm" color="secondary" />
            </TouchableOpacity>
          )}

          {/* Dropdown Icon */}
          <AtomicIcon
            name={modalVisible ? 'ChevronUp' : 'ChevronDown'}
            size="sm"
            color={disabled ? 'surfaceVariant' : 'secondary'}
          />
        </View>
      </TouchableOpacity>

      {/* Selected Chips (Multi-select) */}
      <PickerChips
        selectedOptions={selectedOptions}
        onRemoveChip={handleChipRemove}
        testID={testID}
      />

      {/* Error Message */}
      {error && <AtomicText style={errorStyles}>{error}</AtomicText>}

      {/* Selection Modal */}
      <PickerModal
        visible={modalVisible}
        onClose={closeModal}
        options={options}
        selectedValues={selectedValues}
        onSelect={handleSelect}
        title={modalTitle || label}
        searchable={searchable}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        filteredOptions={filteredOptions}
        multiple={multiple}
        emptyMessage={emptyMessage}
        searchPlaceholder={searchPlaceholder}
        closeAccessibilityLabel={closeAccessibilityLabel}
        testID={testID}
      />
    </View>
  );
};
