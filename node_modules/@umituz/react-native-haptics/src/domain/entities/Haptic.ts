/**
 * Haptics Domain - Core Entities
 *
 * This file defines core types and interfaces for haptic feedback.
 * Handles vibration patterns and feedback types using expo-haptics.
 *
 * @domain haptics
 * @layer domain/entities
 */

/**
 * Impact feedback style (compatible with expo-haptics)
 */
export type ImpactStyle = 'Light' | 'Medium' | 'Heavy';

/**
 * Notification feedback type (compatible with expo-haptics)
 */
export type NotificationType = 'Success' | 'Warning' | 'Error';

/**
 * Haptic patterns for common interactions
 */
export type HapticPattern =
  | 'Success'
  | 'Warning'
  | 'Error'
  | 'selection';

/**
 * Haptic constants
 */
export const HAPTIC_CONSTANTS = {
  DEFAULT_IMPACT: 'Light' as ImpactStyle,
  BUTTON_IMPACT: 'Light' as ImpactStyle,
  DELETE_IMPACT: 'Medium' as ImpactStyle,
  ERROR_IMPACT: 'Heavy' as ImpactStyle,
} as const;

/**
 * Haptic utilities
 * Simplified - pattern handling moved to HapticService
 */
export class HapticUtils {
  /**
   * Get default impact style for common patterns
   */
  static getDefaultImpact(): ImpactStyle {
    return 'Light';
  }
}
