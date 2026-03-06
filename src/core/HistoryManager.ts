/**
 * History Manager for Undo/Redo functionality
 */

export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export class HistoryManager<T> {
  private readonly maxHistory = 20;

  createInitialState(initialValue: T): HistoryState<T> {
    return { past: [], present: initialValue, future: [] };
  }

  push(history: HistoryState<T>, newValue: T): HistoryState<T> {
    return {
      past: [...history.past.slice(-this.maxHistory + 1), history.present],
      present: newValue,
      future: [],
    };
  }

  undo(history: HistoryState<T>): HistoryState<T> {
    if (history.past.length === 0) return history;
    const previous = history.past[history.past.length - 1];
    return {
      past: history.past.slice(0, -1),
      present: previous,
      future: [history.present, ...history.future],
    };
  }

  redo(history: HistoryState<T>): HistoryState<T> {
    if (history.future.length === 0) return history;
    const next = history.future[0];
    return {
      past: [...history.past, history.present],
      present: next,
      future: history.future.slice(1),
    };
  }

  canUndo(history: HistoryState<T>): boolean {
    return history.past.length > 0;
  }

  canRedo(history: HistoryState<T>): boolean {
    return history.future.length > 0;
  }
}
