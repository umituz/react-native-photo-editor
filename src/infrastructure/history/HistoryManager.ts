/**
 * History Manager Implementation
 * Legacy compatibility wrapper for HistoryService
 */

import { HistoryService } from "../../domain/services/HistoryService";

const historyService = new HistoryService(20);

export type { HistoryState } from "../../domain/services/HistoryService";

export class HistoryManager<T> {
  private readonly maxHistory = 20;

  createInitialState(initialValue: T) {
    return historyService.createInitialState(initialValue);
  }

  push(history: any, newValue: T) {
    return historyService.push(history, newValue);
  }

  undo(history: any) {
    return historyService.undo(history);
  }

  redo(history: any) {
    return historyService.redo(history);
  }

  canUndo(history: any) {
    return historyService.canUndo(history);
  }

  canRedo(history: any) {
    return historyService.canRedo(history);
  }
}
