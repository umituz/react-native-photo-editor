/**
 * Calendar Store (Zustand)
 *
 * Global state management for calendar functionality.
 * Manages calendar view state, selected date, and events.
 *
 * Design Philosophy:
 * - Zustand for lightweight state
 * - AsyncStorage for persistence
 * - Generic event handling
 * - Timezone-aware via CalendarService
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storageRepository, unwrap, storageService } from '@umituz/react-native-storage';
import type { CalendarEvent, CreateCalendarEventRequest, UpdateCalendarEventRequest } from '../../domain/entities/CalendarEvent.entity';
import { CalendarService } from '../services/CalendarService';

/**
 * Calendar view mode
 */
export type CalendarViewMode = 'month' | 'week' | 'day' | 'list';

/**
 * Storage key for calendar events
 */
const STORAGE_KEY = 'calendar_events';

/**
 * Generate unique ID for events
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calendar state (data only)
 */
interface CalendarState {
  events: CalendarEvent[];
  selectedDate: Date;
  currentMonth: Date;
  viewMode: CalendarViewMode;
  isLoading: boolean;
  error: string | null;
}

/**
 * Calendar actions
 */
interface CalendarActions {
  // Event CRUD
  loadEvents: () => Promise<void>;
  addEvent: (request: CreateCalendarEventRequest) => Promise<void>;
  updateEvent: (request: UpdateCalendarEventRequest) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  completeEvent: (id: string) => Promise<void>;
  uncompleteEvent: (id: string) => Promise<void>;

  // Navigation
  setSelectedDate: (date: Date) => void;
  goToToday: () => void;
  navigateMonth: (direction: 'prev' | 'next') => void;
  navigateWeek: (direction: 'prev' | 'next') => void;
  setCurrentMonth: (date: Date) => void;

  // View mode
  setViewMode: (mode: CalendarViewMode) => void;

  // Utilities
  getEventsForDate: (date: Date) => CalendarEvent[];
  getEventsForMonth: (year: number, month: number) => CalendarEvent[];
  clearError: () => void;
  clearAllEvents: () => Promise<void>;
}

/**
 * Initial state
 */
const initialState: CalendarState = {
  events: [],
  selectedDate: new Date(),
  currentMonth: new Date(),
  viewMode: 'month',
  isLoading: false,
  error: null,
};

/**
 * Calendar Store
 */
export const useCalendarStore = create<CalendarState & { actions: CalendarActions }>()(
  persist(
    (set, get) => ({
      ...initialState,
      actions: {
        /**
         * Load events from storage
         */
        loadEvents: async () => {
          set({ isLoading: true, error: null });
          try {
            const result = await storageRepository.getItem<CalendarEvent[]>(STORAGE_KEY, []);
            const events = unwrap(result, []);
            
            if (events && events.length > 0) {
              // Restore Date objects
              const hydratedEvents = events.map((event) => ({
                ...event,
                createdAt: new Date(event.createdAt),
                updatedAt: new Date(event.updatedAt),
              }));
              set({ events: hydratedEvents, isLoading: false });
            } else {
              set({ isLoading: false });
            }
          } catch {
            set({
              error: 'Failed to load events',
              isLoading: false,
            });
          }
        },

        /**
         * Add a new event
         */
        addEvent: async (request: CreateCalendarEventRequest) => {
          set({ isLoading: true, error: null });
          try {
            const newEvent: CalendarEvent = {
              id: generateId(),
              ...request,
              isCompleted: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            const events = [...get().events, newEvent];
            await storageRepository.setItem(STORAGE_KEY, events);
            set({ events, isLoading: false });
          } catch {
            set({
              error: 'Failed to add event',
              isLoading: false,
            });
          }
        },

        /**
         * Update an existing event
         */
        updateEvent: async (request: UpdateCalendarEventRequest) => {
          set({ isLoading: true, error: null });
          try {
            const events = get().events.map((event) => {
              if (event.id === request.id) {
                return {
                  ...event,
                  ...request,
                  updatedAt: new Date(),
                };
              }
              return event;
            });

            await storageRepository.setItem(STORAGE_KEY, events);
            set({ events, isLoading: false });
          } catch {
            set({
              error: 'Failed to update event',
              isLoading: false,
            });
          }
        },

        /**
         * Delete an event
         */
        deleteEvent: async (id: string) => {
          set({ isLoading: true, error: null });
          try {
            const events = get().events.filter((event) => event.id !== id);
            await storageRepository.setItem(STORAGE_KEY, events);
            set({ events, isLoading: false });
          } catch {
            set({
              error: 'Failed to delete event',
              isLoading: false,
            });
          }
        },

        /**
         * Mark event as completed
         */
        completeEvent: async (id: string) => {
          await get().actions.updateEvent({ id, isCompleted: true });
        },

        /**
         * Mark event as incomplete
         */
        uncompleteEvent: async (id: string) => {
          await get().actions.updateEvent({ id, isCompleted: false });
        },

        /**
         * Set selected date
         */
        setSelectedDate: (date: Date) => {
          set({ selectedDate: date });
        },

        /**
         * Go to today's date
         */
        goToToday: () => {
          const today = new Date();
          set({
            selectedDate: today,
            currentMonth: today,
          });
        },

        /**
         * Navigate to previous/next month
         */
        navigateMonth: (direction: 'prev' | 'next') => {
          const currentMonth = get().currentMonth;
          const newMonth =
            direction === 'prev'
              ? CalendarService.getPreviousMonth(currentMonth)
              : CalendarService.getNextMonth(currentMonth);

          set({ currentMonth: newMonth });
        },

        /**
         * Navigate to previous/next week
         */
        navigateWeek: (direction: 'prev' | 'next') => {
          const selectedDate = get().selectedDate;
          const newDate =
            direction === 'prev'
              ? CalendarService.getPreviousWeek(selectedDate)
              : CalendarService.getNextWeek(selectedDate);

          set({ selectedDate: newDate });
        },

        /**
         * Set current month directly
         */
        setCurrentMonth: (date: Date) => {
          set({ currentMonth: date });
        },

        /**
         * Set view mode
         */
        setViewMode: (mode: CalendarViewMode) => {
          set({ viewMode: mode });
        },

        /**
         * Get events for a specific date
         */
        getEventsForDate: (date: Date) => {
          const events = get().events;
          return CalendarService.getEventsForDate(date, events);
        },

        /**
         * Get events for a specific month
         */
        getEventsForMonth: (year: number, month: number) => {
          const events = get().events;
          const firstDay = new Date(year, month, 1);
          const lastDay = new Date(year, month + 1, 0);
          return CalendarService.getEventsInRange(firstDay, lastDay, events);
        },

        /**
         * Clear error state
         */
        clearError: () => {
          set({ error: null });
        },

        /**
         * Clear all events (for testing/reset)
         */
        clearAllEvents: async () => {
          set({ isLoading: true, error: null });
          try {
            await storageRepository.removeItem(STORAGE_KEY);
            set({ events: [], isLoading: false });
          } catch {
            set({
              error: 'Failed to clear events',
              isLoading: false,
            });
          }
        },
      },
    }),
    {
      name: 'calendar-storage',
      storage: createJSONStorage(() => storageService),
      partialize: (state) => ({ events: state.events }),
    }
  )
);
