/**
 * useCalendar Hook
 *
 * Main hook for calendar functionality.
 * Provides calendar state, events, and actions.
 *
 * Usage:
 * ```tsx
 * const {
 *   days,
 *   events,
 *   selectedDate,
 *   viewMode,
 *   actions
 * } = useCalendar();
 *
 * // Navigate calendar
 * actions.navigateMonth('next');
 *
 * // Add event
 * actions.addEvent({
 *   title: 'Team Meeting',
 *   date: '2024-10-30',
 *   time: '14:00',
 * });
 * ```
 */

import { useMemo, useEffect } from 'react';
import { useCalendarStore, type CalendarViewMode } from '../../infrastructure/storage/CalendarStore';
import { CalendarService } from '../../infrastructure/services/CalendarService';
import type { CalendarDay } from '../../domain/entities/CalendarDay.entity';
import type { CalendarEvent } from '../../domain/entities/CalendarEvent.entity';

/**
 * Calendar hook return type
 */
export interface UseCalendarReturn {
  // Calendar data
  days: CalendarDay[];
  events: CalendarEvent[];
  selectedDate: Date;
  currentMonth: Date;
  viewMode: CalendarViewMode;

  // Computed data
  selectedDateEvents: CalendarEvent[];
  currentMonthEvents: CalendarEvent[];

  // State
  isLoading: boolean;
  error: string | null;

  // Actions
  actions: {
    loadEvents: () => Promise<void>;
    addEvent: (request: any) => Promise<void>;
    updateEvent: (request: any) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    completeEvent: (id: string) => Promise<void>;
    uncompleteEvent: (id: string) => Promise<void>;
    setSelectedDate: (date: Date) => void;
    goToToday: () => void;
    navigateMonth: (direction: 'prev' | 'next') => void;
    navigateWeek: (direction: 'prev' | 'next') => void;
    setCurrentMonth: (date: Date) => void;
    setViewMode: (mode: CalendarViewMode) => void;
    getEventsForDate: (date: Date) => CalendarEvent[];
    getEventsForMonth: (year: number, month: number) => CalendarEvent[];
    clearError: () => void;
    clearAllEvents: () => Promise<void>;
  };
}

/**
 * Main calendar hook
 */
export const useCalendar = (): UseCalendarReturn => {
  const store = useCalendarStore();
  const {
    events,
    selectedDate,
    currentMonth,
    viewMode,
    isLoading,
    error,
    actions,
  } = store;

  // Load events on mount
  useEffect(() => {
    actions.loadEvents();
  }, []);

  // Generate calendar days for current month
  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return CalendarService.getMonthDays(year, month, events);
  }, [currentMonth, events]);

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    return actions.getEventsForDate(selectedDate);
  }, [selectedDate, events]);

  // Get events for current month
  const currentMonthEvents = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return actions.getEventsForMonth(year, month);
  }, [currentMonth, events]);

  return {
    days,
    events,
    selectedDate,
    currentMonth,
    viewMode,
    selectedDateEvents,
    currentMonthEvents,
    isLoading,
    error,
    actions,
  };
};

/**
 * Hook for calendar navigation
 * Lightweight hook for just navigation actions
 */
export const useCalendarNavigation = () => {
  const store = useCalendarStore();
  const {
    selectedDate,
    currentMonth,
    actions: { setSelectedDate, navigateMonth, goToToday, setCurrentMonth },
  } = store;

  return {
    selectedDate,
    currentMonth,
    setSelectedDate,
    navigateMonth,
    goToToday,
    setCurrentMonth,
  };
};

/**
 * Hook for calendar events only
 * Lightweight hook for just event operations
 */
export const useCalendarEvents = () => {
  const store = useCalendarStore();
  const {
    events,
    isLoading,
    error,
    actions: {
      loadEvents,
      addEvent,
      updateEvent,
      deleteEvent,
      completeEvent,
      uncompleteEvent,
      clearError,
    },
  } = store;

  return {
    events,
    isLoading,
    error,
    loadEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    completeEvent,
    uncompleteEvent,
    clearError,
  };
};
