/**
 * AtomicDatePicker Component
 *
 * A reusable date picker component that wraps the native date picker
 * with consistent styling and behavior across platforms.
 *
 * Features:
 * - Platform-specific native pickers (iOS wheel, Android dialog)
 * - Consistent styling with design tokens
 * - Locale-aware date/time formatting (native Date methods)
 * - Timezone-aware (respects device timezone)
 * - Automatic language integration (native locale support)
 * - Optional label and error states
 * - Minimum and maximum date constraints
 * - Disabled state support
 * - Theme-aware styling
 * - Proper keyboard avoidance on iOS
 *
 * Usage:
 * ```tsx
 * const [selectedDate, setSelectedDate] = useState(new Date());
 *
 * <AtomicDatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   label="Birth Date"
 *   minimumDate={new Date(1900, 0, 1)}
 *   maximumDate={new Date()}
 * />
 * ```
 *
 * Platform Behavior:
 * - Opens bottom sheet from bottom with spinner wheel
 * - Requires "Done" button to confirm selection
 * - Can be dismissed by swiping down or tapping backdrop
 *
 * @module AtomicDatePicker
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAppDesignTokens } from '../theme';
import { AtomicText } from './AtomicText';
import { DatePickerModal } from './datepicker/components/DatePickerModal';
import { DatePickerButton } from './datepicker/components/DatePickerButton';

/**
 * Props for AtomicDatePicker component
 */
export interface AtomicDatePickerProps {
  /** Selected date value */
  value: Date | null;
  /** Callback when date changes */
  onChange: (date: Date) => void;
  /** Optional label displayed above picker */
  label?: string;
  /** Optional error message displayed below picker */
  error?: string;
  /** Disable picker interaction */
  disabled?: boolean;
  /** Minimum selectable date */
  minimumDate?: Date;
  /** Maximum selectable date */
  maximumDate?: Date;
  /** Picker mode - date, time, or datetime (iOS only) */
  mode?: 'date' | 'time' | 'datetime';
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Optional test ID for E2E testing */
  testID?: string;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * AtomicDatePicker - Universal date/time picker component
 *
 * Wraps @react-native-community/datetimepicker with:
 * - Theme integration
 * - Platform-specific modal handling
 * - Error states
 * - Disabled states
 * - Responsive sizing
 */
export const AtomicDatePicker: React.FC<AtomicDatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  disabled = false,
  minimumDate,
  maximumDate,
  mode = 'date',
  placeholder = 'Select date',
  testID,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const [showPicker, setShowPicker] = useState(false);

  /**
   * Handle date/time change in picker
   * On Android, directly apply the change. On iOS, show picker in modal and apply on confirm.
   */
  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
    } else {
      // iOS: Update value while picker is open
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate);
      }
      // iOS: Close on dismiss (swipe down)
      if (event.type === 'dismissed') {
        setShowPicker(false);
      }
    }
  };

  /**
   * Handle open - show native picker
   */
  const handleOpen = () => {
    if (Platform.OS === 'android') {
      setShowPicker(true);
    } else {
      // iOS: Show picker inline
      setShowPicker(true);
    }
  };

  /**
   * Format date based on mode
   * Uses native Date formatting (locale-aware)
   */
  const formatDate = useMemo(() => (date: Date): string => {
    if (mode === 'time') {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    if (mode === 'datetime') {
      const dateStr = date.toLocaleDateString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const timeStr = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `${dateStr} ${timeStr}`;
    }
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [mode]);

  /**
   * Get display text for the button
   */
  const displayText = useMemo(() => {
    if (!value) return placeholder;
    return formatDate(value);
  }, [value, placeholder, formatDate]);

  const styles = getStyles(tokens);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <AtomicText style={styles.label} testID={testID ? `${testID}-label` : undefined}>
          {label}
        </AtomicText>
      )}

      <DatePickerButton
        onPress={handleOpen}
        disabled={disabled}
        displayText={displayText}
        hasValue={!!value}
        error={!!error}
        testID={testID ? `${testID}-button` : undefined}
      />

      {error && (
        <AtomicText style={styles.errorText} testID={testID ? `${testID}-error` : undefined}>
          {error}
        </AtomicText>
      )}

      {/* iOS Modal */}
      <DatePickerModal
        visible={Platform.OS === 'ios' && showPicker}
        onClose={() => setShowPicker(false)}
        onDateChange={handleChange}
        currentDate={value ?? new Date()}
        mode={mode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        testID={testID}
      />

      {/* Android Picker */}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          testID={testID ? `${testID}-picker` : undefined}
        />
      )}
    </View>
  );
};

/**
 * Get component styles based on design tokens
 */
const getStyles = (tokens: ReturnType<typeof useAppDesignTokens>) => {
  return StyleSheet.create({
    container: {
      marginBottom: tokens.spacing.md,
    },
    label: {
      fontSize: tokens.typography.bodyMedium.responsiveFontSize,
      fontWeight: tokens.typography.semibold,
      color: tokens.colors.onSurface,
      marginBottom: tokens.spacing.sm,
    },
    errorText: {
      fontSize: tokens.typography.bodySmall.responsiveFontSize,
      color: tokens.colors.error,
      marginTop: tokens.spacing.xs,
      marginLeft: tokens.spacing.xs,
    },
  });
};
