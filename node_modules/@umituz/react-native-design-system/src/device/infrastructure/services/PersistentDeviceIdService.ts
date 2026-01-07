/**
 * Persistent Device ID Service
 *
 * Provides a stable, persistent device identifier that survives app restarts.
 * Uses native device ID when available, falls back to generated UUID.
 * Stores the ID in AsyncStorage for persistence.
 *
 * @domain device
 * @layer infrastructure/services
 */

import { storageRepository, unwrap } from '@umituz/react-native-storage';
import { DeviceIdService } from './DeviceIdService';

const STORAGE_KEY = '@device/persistent_id';

/** Cached ID to avoid repeated AsyncStorage reads */
let cachedDeviceId: string | null = null;

/** Promise to prevent race conditions during initialization */
let initializationPromise: Promise<string> | null = null;

/**
 * Generate a UUID v4 without external dependencies
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Service for managing persistent device identifiers
 */
export class PersistentDeviceIdService {
  /**
   * Get or create a persistent device ID
   *
   * This method:
   * 1. Returns cached ID if available (fastest)
   * 2. Checks AsyncStorage for previously stored ID
   * 3. If not found, gets native device ID or generates UUID
   * 4. Stores and caches the result for future calls
   *
   * Thread-safe: Multiple concurrent calls return the same promise
   */
  static async getDeviceId(): Promise<string> {
    if (cachedDeviceId) {
      return cachedDeviceId;
    }

    if (initializationPromise) {
      return initializationPromise;
    }

    initializationPromise = this.initializeDeviceId();
    return initializationPromise;
  }

  /**
   * Initialize and persist device ID
   */
  private static async initializeDeviceId(): Promise<string> {
    try {
      const result = await storageRepository.getString(STORAGE_KEY, '');
      const storedId = unwrap(result, '');

      if (storedId) {
        cachedDeviceId = storedId;
        return storedId;
      }

      const newId = await this.createNewDeviceId();
      await storageRepository.setString(STORAGE_KEY, newId);
      cachedDeviceId = newId;

      return newId;
    } catch {
      const fallbackId = generateUUID();
      cachedDeviceId = fallbackId;
      return fallbackId;
    }
  }

  /**
   * Create a new device ID from native source or generate one
   */
  private static async createNewDeviceId(): Promise<string> {
    const nativeId = await DeviceIdService.getDeviceId();

    if (nativeId) {
      return `device_${nativeId}`;
    }

    return `generated_${generateUUID()}`;
  }

  /**
   * Check if device ID exists in storage
   */
  static async hasStoredId(): Promise<boolean> {
    try {
      return await storageRepository.hasItem(STORAGE_KEY);
    } catch {
      return false;
    }
  }

  /**
   * Clear stored device ID (use with caution)
   * This will generate a new ID on next getDeviceId() call
   */
  static async clearStoredId(): Promise<void> {
    try {
      await storageRepository.removeItem(STORAGE_KEY);
      cachedDeviceId = null;
      initializationPromise = null;
    } catch {
      // Silent fail - non-critical operation
    }
  }

  /**
   * Get the cached device ID without async operation
   * Returns null if not yet initialized
   */
  static getCachedId(): string | null {
    return cachedDeviceId;
  }
}
