/**
 * History Service
 * Undo/redo functionality for any state type
 */

export interface HistoryState<T> {
  past: T[][];
  present: T[];
  future: T[][];
}

export class HistoryService<T> {
  constructor(private readonly maxSize: number = 20) {}

  createInitialState(initialValue: T[]): HistoryState<T> {
    return {
      past: [],
      present: initialValue,
      future: [],
    };
  }

  push(history: HistoryState<T>, newValue: T[]): HistoryState<T> {
    const past = [...history.past, history.present];
    const trimmedPast = past.slice(-this.maxSize);

    return {
      past: trimmedPast,
      present: newValue,
      future: [],
    };
  }

  undo(history: HistoryState<T>): HistoryState<T> {
    if (history.past.length === 0) return history;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    const newFuture = [history.present, ...history.future];

    return {
      past: newPast,
      present: previous,
      future: newFuture,
    };
  }

  redo(history: HistoryState<T>): HistoryState<T> {
    if (history.future.length === 0) return history;

    const next = history.future[0];
    const newPast = [...history.past, history.present];
    const newFuture = history.future.slice(1);

    return {
      past: newPast,
      present: next,
      future: newFuture,
    };
  }

  canUndo(history: HistoryState<T>): boolean {
    return history.past.length > 0;
  }

  canRedo(history: HistoryState<T>): boolean {
    return history.future.length > 0;
  }
}
