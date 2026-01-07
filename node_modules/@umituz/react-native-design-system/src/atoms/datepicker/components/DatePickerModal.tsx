/**
 * DatePickerModal Component
 *
 * Modal component for iOS date picker with proper styling and behavior.
 * Extracted from AtomicDatePicker for better separation of concerns.
 */

import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from '../../../safe-area';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAppDesignTokens } from '../../../theme';
import { AtomicText } from '../../AtomicText';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void;
  currentDate: Date;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  overlayOpacity?: number;
  titleText?: {
    date?: string;
    time?: string;
    datetime?: string;
  };
  doneButtonText?: string;
  testID?: string;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onDateChange,
  currentDate,
  mode = 'date',
  minimumDate,
  maximumDate,
  overlayOpacity = 0.5,
  titleText,
  doneButtonText = 'Done',
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  const modalStyles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: tokens.colors.surface,
      borderTopLeftRadius: tokens.borders.radius.lg,
      borderTopRightRadius: tokens.borders.radius.lg,
      paddingBottom: insets.bottom,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: tokens.colors.outline,
    },
    title: {
      fontSize: tokens.typography.titleLarge.fontSize,
      fontWeight: '600',
      color: tokens.colors.onSurface,
    },
    doneButton: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.md,
      backgroundColor: tokens.colors.primary,
    },
    doneButtonText: {
      fontSize: tokens.typography.labelMedium.fontSize,
      fontWeight: '500',
      color: tokens.colors.onPrimary,
    },
  });

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      testID={`${testID}-modal`}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.container}>
          {/* Header */}
          <View style={modalStyles.header}>
            <AtomicText style={modalStyles.title}>
              {mode === 'date'
                ? (titleText?.date || 'Select Date')
                : mode === 'time'
                  ? (titleText?.time || 'Select Time')
                  : (titleText?.datetime || 'Select Date & Time')
              }
            </AtomicText>
            <TouchableOpacity
              onPress={onClose}
              style={modalStyles.doneButton}
              testID={`${testID}-done`}
            >
              <AtomicText style={modalStyles.doneButtonText}>{doneButtonText}</AtomicText>
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <DateTimePicker
            value={currentDate}
            mode={mode}
            onChange={onDateChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            display="spinner"
            style={{ alignSelf: 'center' }}
            testID={`${testID}-picker`}
          />
        </View>
      </View>
    </Modal>
  );
};