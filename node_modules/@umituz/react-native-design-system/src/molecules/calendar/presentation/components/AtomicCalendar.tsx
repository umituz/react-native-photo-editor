/**
 * AtomicCalendar Component
 *
 * Generic, reusable calendar component with month view.
 * Works with any type of events (workouts, habits, tasks, etc.)
 *
 * Features:
 * - Monthly grid view (42 days = 6 weeks)
 * - Timezone-aware via calendar service
 * - Event indicators (colored dots)
 * - Customizable styling
 * - Accessible
 * - Theme-aware
 *
 * Usage:
 * ```tsx
 * import { AtomicCalendar, useCalendar } from '@umituz/react-native-calendar';
 *
 * const MyScreen = () => {
 *   const { days, selectedDate, actions } = useCalendar();
 *
 *   return (
 *     <AtomicCalendar
 *       days={days}
 *       selectedDate={selectedDate}
 *       onDateSelect={actions.setSelectedDate}
 *     />
 *   );
 * };
 * ```
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useAppDesignTokens, AtomicText } from '../../../../index';
import type { CalendarDay } from '../../domain/entities/CalendarDay.entity';
import { CalendarService } from '../../infrastructure/services/CalendarService';

/**
 * AtomicCalendar Props
 */
export interface AtomicCalendarProps {
  /**
   * Calendar days to display (42 days for 6-week grid)
   */
  days: CalendarDay[];

  /**
   * Currently selected date
   */
  selectedDate: Date;

  /**
   * Callback when a date is selected
   */
  onDateSelect: (date: Date) => void;

  /**
   * Whether to show weekday headers
   * @default true
   */
  showWeekdayHeaders?: boolean;

  /**
   * Maximum number of event indicators to show per day
   * @default 3
   */
  maxEventIndicators?: number;

  /**
   * Custom container style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom day cell style
   */
  dayStyle?: StyleProp<ViewStyle>;

  /**
   * Whether to show event count when exceeds max indicators
   * @default true
   */
  showEventCount?: boolean;

  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * AtomicCalendar Component
 */
export const AtomicCalendar: React.FC<AtomicCalendarProps> = ({
  days,
  selectedDate,
  onDateSelect,
  showWeekdayHeaders = true,
  maxEventIndicators = 3,
  style,
  dayStyle,
  showEventCount = true,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Get weekday names (localized)
  const weekdayNames = CalendarService.getWeekdayNames();

  return (
    <View style={[styles.container, { backgroundColor: tokens.colors.surface }, style]} testID={testID}>
      {/* Weekday Headers */}
      {showWeekdayHeaders && (
        <View style={styles.weekdayHeader}>
          {weekdayNames.map((day, index) => (
            <View key={index} style={styles.weekdayCell}>
              <AtomicText
                type="bodySmall"
                color="secondary"
                style={styles.weekdayText}
              >
                {day}
              </AtomicText>
            </View>
          ))}
        </View>
      )}

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {days.map((day, index) => {
          const isSelected = CalendarService.isSameDay(day.date, selectedDate);
          const eventCount = day.events.length;
          const visibleEvents = day.events.slice(0, maxEventIndicators);
          const hiddenEventCount = Math.max(0, eventCount - maxEventIndicators);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCell,
                {
                  backgroundColor: isSelected
                    ? tokens.colors.primary
                    : 'transparent',
                  borderColor: isSelected
                    ? tokens.colors.primary
                    : day.isToday
                      ? tokens.colors.primary
                      : tokens.colors.border,
                  borderWidth: isSelected ? 2 : day.isToday ? 2 : 1,
                  opacity: day.isDisabled ? 0.4 : 1,
                },
                dayStyle,
              ]}
              onPress={() => !day.isDisabled && onDateSelect(day.date)}
              disabled={day.isDisabled}
              testID={testID ? `${testID}-day-${index}` : undefined}
              accessibilityLabel={`${day.date.toLocaleDateString()}, ${eventCount} events`}
              accessibilityRole="button"
              accessibilityState={{ disabled: day.isDisabled, selected: isSelected }}
            >
              {/* Day Number */}
              <AtomicText
                type="bodyMedium"
                color={
                  isSelected
                    ? 'inverse'
                    : day.isCurrentMonth
                      ? 'primary'
                      : 'secondary'
                }
                style={[
                  styles.dayText,
                  day.isToday && !isSelected && { fontWeight: 'bold' },
                ]}
              >
                {day.date.getDate()}
              </AtomicText>

              {/* Event Indicators */}
              <View style={styles.eventIndicators}>
                {/* Today indicator (if today and has no events) */}
                {day.isToday && eventCount === 0 && (
                  <View
                    style={[
                      styles.eventDot,
                      { backgroundColor: tokens.colors.success },
                    ]}
                  />
                )}

                {/* Event dots */}
                {visibleEvents.map((event, eventIndex) => (
                  <View
                    key={eventIndex}
                    style={[
                      styles.eventDot,
                      {
                        backgroundColor: event.color
                          ? event.color
                          : event.isCompleted
                            ? tokens.colors.success
                            : tokens.colors.primary,
                      },
                    ]}
                  />
                ))}

                {/* More events count */}
                {showEventCount && hiddenEventCount > 0 && (
                  <AtomicText
                    type="bodySmall"
                    color="secondary"
                    style={styles.moreEventsText}
                  >
                    +{hiddenEventCount}
                  </AtomicText>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
  },
  weekdayHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekdayText: {
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 4,
    padding: 4,
  },
  dayText: {
    textAlign: 'center',
  },
  eventIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    gap: 2,
    flexWrap: 'wrap',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  moreEventsText: {
    fontSize: 8,
    marginLeft: 2,
  },
});
