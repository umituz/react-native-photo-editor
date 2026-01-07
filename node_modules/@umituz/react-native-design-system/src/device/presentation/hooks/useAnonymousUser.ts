/**
 * Anonymous User Hook
 *
 * Provides persistent device-based user ID for anonymous users.
 * The ID is stable across app restarts and sessions.
 * Compatible with subscription services and Firebase Anonymous Auth.
 *
 * @domain device
 * @layer presentation/hooks
 */

import { useState, useEffect, useCallback } from 'react';
import { PersistentDeviceIdService } from '../../infrastructure/services/PersistentDeviceIdService';
import { DeviceService } from '../../infrastructure/services/DeviceService';

/**
 * Anonymous user data
 */
export interface AnonymousUser {
  /** Persistent device-based user ID (stable across sessions) */
  userId: string;
  /** User-friendly device name (e.g., "iPhone13-A8F2") */
  deviceName: string;
  /** Display name for the anonymous user */
  displayName: string;
  /** Always true for anonymous users */
  isAnonymous: boolean;
}

/**
 * useAnonymousUser hook options
 */
export interface UseAnonymousUserOptions {
  /** Custom display name for anonymous user */
  anonymousDisplayName?: string;
  /** Fallback user ID if device ID generation fails */
  fallbackUserId?: string;
}

/**
 * useAnonymousUser hook for persistent device-based user identification
 *
 * USAGE:
 * ```typescript
 * import { useAnonymousUser } from '@umituz/react-native-device';
 *
 * const { anonymousUser, isLoading } = useAnonymousUser();
 *
 * // Use for subscription services
 * await subscriptionService.initialize(anonymousUser?.userId);
 *
 * // Use in SettingsScreen
 * <UserProfileHeader
 *   userId={anonymousUser?.userId}
 *   displayName={anonymousUser?.displayName}
 *   isAnonymous={anonymousUser?.isAnonymous}
 * />
 * ```
 */
export const useAnonymousUser = (options?: UseAnonymousUserOptions) => {
  const [anonymousUser, setAnonymousUser] = useState<AnonymousUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    anonymousDisplayName = 'Anonymous',
    fallbackUserId = 'anonymous_fallback',
  } = options || {};

  const loadAnonymousUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [userId, deviceName] = await Promise.all([
        PersistentDeviceIdService.getDeviceId(),
        DeviceService.getUserFriendlyId(),
      ]);

      setAnonymousUser({
        userId: userId || fallbackUserId,
        deviceName: deviceName || 'Unknown Device',
        displayName: anonymousDisplayName,
        isAnonymous: true,
      });
    } catch {
      setAnonymousUser({
        userId: fallbackUserId,
        deviceName: 'Unknown Device',
        displayName: anonymousDisplayName,
        isAnonymous: true,
      });
      setError('Failed to generate device ID');
    } finally {
      setIsLoading(false);
    }
  }, [anonymousDisplayName, fallbackUserId]);

  const refresh = useCallback(async () => {
    await loadAnonymousUser();
  }, [loadAnonymousUser]);

  useEffect(() => {
    loadAnonymousUser();
  }, [loadAnonymousUser]);

  return {
    /** Anonymous user data with persistent device-based ID */
    anonymousUser,
    /** Loading state */
    isLoading,
    /** Error message if ID generation failed */
    error,
    /** Refresh function to reload user data */
    refresh,
  };
};
