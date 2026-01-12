/**
 * History Manager for Undo/Redo functionality
 */

export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export class HistoryManager<T> {
  private maxHistory = 20;

  createInitialState(initialValue: T): HistoryState<T> {
    return {
      past: [],
      present: initialValue,
      future: [],
    };
  }

  push(history: HistoryState<T>, newValue: T): HistoryState<T> {
    const { past, present } = history;

    return {
      past: [...past.slice(-this.maxHistory + 1), present],
      present: newValue,
      future: [],
    };
  }

  undo(history: HistoryState<T>): HistoryState<T> {
    const { past, present, future } = history;

    if (past.length === 0) {
      return history;
    }

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    return {
      past: newPast,
      present: previous,
      future: [present, ...future],
    };
  }

  redo(history: HistoryState<T>): HistoryState<T> {
    const { past, present, future } = history;

    if (future.length === 0) {
      return history;
    }

    const next = future[0];
    const newFuture = future.slice(1);

    return {
      past: [...past, present],
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


