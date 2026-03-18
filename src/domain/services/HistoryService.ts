/**
 * History Service
 * Manages undo/redo state with configurable max history
 */

export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export class HistoryService<T> {
  constructor(private readonly maxHistory: number = 20) {}

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
    if (!this.canUndo(history)) return history;

    const previous = history.past[history.past.length - 1];
    return {
      past: history.past.slice(0, -1),
      present: previous,
      future: [history.present, ...history.future],
    };
  }

  redo(history: HistoryState<T>): HistoryState<T> {
    if (!this.canRedo(history)) return history;

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

  clear(history: HistoryState<T>): HistoryState<T> {
    return { past: [], present: history.present, future: [] };
  }
}
