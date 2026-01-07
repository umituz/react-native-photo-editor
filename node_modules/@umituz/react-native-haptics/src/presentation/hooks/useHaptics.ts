/**
 * Haptics Domain - useHaptics Hook
 *
 * React hook for haptic feedback.
 * Provides vibration patterns for common interactions.
 *
 * @domain haptics
 * @layer presentation/hooks
 */

import { useCallback } from 'react';
import { HapticService } from '../../infrastructure/services/HapticService';
import type { ImpactStyle, NotificationType, HapticPattern } from '../../domain/entities/Haptic';

/**
 * useHaptics hook for haptic feedback
 *
 * USAGE:
 * ```typescript
 * const haptics = useHaptics();
 *
 * // Common patterns (convenience methods)
 * <TouchableOpacity onPress={() => haptics.buttonPress()}>
 *   <Text>Click Me</Text>
 * </TouchableOpacity>
 *
 * // Success feedback
 * const handleSuccess = async () => {
 *   await saveData();
 *   haptics.success();
 * };
 *
 * // Error feedback
 * const handleError = () => {
 *   haptics.error();
 * };
 *
 * // Selection change (sliders, pickers)
 * <Slider onValueChange={() => haptics.selectionChange()} />
 *
 * // Custom patterns
 * haptics.pattern('long_press');
 * haptics.impact('heavy');
 * haptics.notification('warning');
 * ```
 */
export const useHaptics = () => {
  /**
   * Trigger impact feedback (light, medium, heavy)
   */
  const impact = useCallback(async (style: ImpactStyle = 'Light') => {
    await HapticService.impact(style);
  }, []);

  /**
   * Trigger notification feedback (success, warning, error)
   */
  const notification = useCallback(async (type: NotificationType) => {
    await HapticService.notification(type);
  }, []);

  /**
   * Trigger selection feedback (for pickers, sliders)
   */
  const selection = useCallback(async () => {
    await HapticService.selection();
  }, []);

  /**
   * Trigger custom haptic pattern
   */
  const pattern = useCallback(async (patternType: HapticPattern) => {
    await HapticService.pattern(patternType);
  }, []);

  /**
   * Common haptic patterns (convenience methods)
   */
  const buttonPress = useCallback(async () => {
    await HapticService.buttonPress();
  }, []);

  const success = useCallback(async () => {
    await HapticService.success();
  }, []);

  const error = useCallback(async () => {
    await HapticService.error();
  }, []);

  const warning = useCallback(async () => {
    await HapticService.warning();
  }, []);

  const deleteItem = useCallback(async () => {
    await HapticService.delete();
  }, []);

  const refresh = useCallback(async () => {
    await HapticService.refresh();
  }, []);

  const selectionChange = useCallback(async () => {
    await HapticService.selectionChange();
  }, []);

  const longPress = useCallback(async () => {
    await HapticService.longPress();
  }, []);

  return {
    // Generic methods
    impact,
    notification,
    selection,
    pattern,

    // Common patterns (convenience methods)
    buttonPress,
    success,
    error,
    warning,
    delete: deleteItem,
    refresh,
    selectionChange,
    longPress,
  };
};
