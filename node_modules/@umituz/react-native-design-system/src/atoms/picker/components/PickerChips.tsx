/**
 * PickerChips Component
 *
 * Component for rendering selected chips in multi-select mode.
 * Extracted from AtomicPicker for better separation of concerns.
 */

import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { PickerOption } from '../types';
import { AtomicIcon } from '../../AtomicIcon';
import { AtomicText } from '../../AtomicText';
import {
  getChipContainerStyles,
  getChipStyles,
  getChipTextStyles,
} from '../styles/pickerStyles';

interface PickerChipsProps {
  selectedOptions: PickerOption[];
  onRemoveChip: (value: string) => void;
  testID?: string;
}

export const PickerChips: React.FC<PickerChipsProps> = React.memo(({
  selectedOptions,
  onRemoveChip,
}) => {
  const tokens = useAppDesignTokens();

  const chipContainerStyles = getChipContainerStyles(tokens);
  const chipStyles = getChipStyles(tokens);
  const chipTextStyles = getChipTextStyles(tokens);

  if (selectedOptions.length === 0) return null;

  return (
    <View style={chipContainerStyles}>
      {selectedOptions.map((opt) => (
        <View key={opt.value} style={chipStyles}>
          <AtomicText style={chipTextStyles}>{opt.label}</AtomicText>
          <TouchableOpacity
            onPress={(e: GestureResponderEvent) => {
              e.stopPropagation();
              onRemoveChip(opt.value);
            }}
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <AtomicIcon name="X" size="sm" color="primary" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
});
PickerChips.displayName = 'PickerChips';