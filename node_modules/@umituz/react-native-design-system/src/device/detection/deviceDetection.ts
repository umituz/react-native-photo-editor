/**
 * Device Detection Utilities
 *
 * Uses expo-device for primary device type detection (PHONE vs TABLET)
 * and screen dimensions for secondary distinctions (small vs large phone).
 *
 * Benefits:
 * - expo-device uses system-level detection on iOS (100% reliable)
 * - Uses screen diagonal on Android (more accurate than pixels)
 * - Future-proof: new devices automatically detected correctly
 */

import { Dimensions } from 'react-native';
import { DEVICE_BREAKPOINTS, LAYOUT_CONSTANTS } from '../../responsive/config';
import { validateScreenDimensions } from '../../responsive/validation';

// Safely try to import expo-device
let Device: any = null;
let ExpoDeviceType: any = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ExpoDevice = require('expo-device');
  Device = ExpoDevice;
  ExpoDeviceType = ExpoDevice.DeviceType;
} catch {
  // Fallback if expo-device is not available
  console.warn('[Design System] expo-device not found, using screen dimensions for device detection');
}

/**
 * Helper function for device detection with fallback
 */
const withDeviceDetectionFallback = <T>(
  operation: () => T,
  fallback: T
): T => {
  try {
    return operation();
  } catch {
    return fallback;
  }
};

/**
 * Device type enum for conditional rendering
 * Used for fine-grained phone size distinctions
 */
export enum DeviceType {
  SMALL_PHONE = 'SMALL_PHONE',
  MEDIUM_PHONE = 'MEDIUM_PHONE',
  LARGE_PHONE = 'LARGE_PHONE',
  TABLET = 'TABLET',
}

/**
 * Get current screen dimensions
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');

  try {
    validateScreenDimensions(width, height);
    return { width, height };
  } catch {
    return { width: 414, height: 896 };
  }
};

/**
 * Check if current device is a tablet
 * Uses expo-device for accurate system-level detection
 */
export const isTablet = (): boolean => {
  return withDeviceDetectionFallback(
    () => Device.deviceType === ExpoDeviceType.TABLET,
    false
  );
};

/**
 * Check if current device is a phone
 * Uses expo-device for accurate system-level detection
 */
export const isPhone = (): boolean => {
  return withDeviceDetectionFallback(
    () => Device.deviceType === ExpoDeviceType.PHONE,
    true
  );
};

/**
 * Check if current device is a small phone (iPhone SE, 13 mini)
 * Uses width breakpoint within phone category
 */
export const isSmallPhone = (): boolean => {
  return withDeviceDetectionFallback(
    () => {
      if (!isPhone()) return false;
      const { width } = getScreenDimensions();
      return width <= DEVICE_BREAKPOINTS.SMALL_PHONE;
    },
    false
  );
};

/**
 * Check if current device is a large phone (Pro Max, Plus models)
 * Uses width breakpoint within phone category
 */
export const isLargePhone = (): boolean => {
  return withDeviceDetectionFallback(
    () => {
      if (!isPhone()) return false;
      const { width } = getScreenDimensions();
      return width >= DEVICE_BREAKPOINTS.MEDIUM_PHONE;
    },
    false
  );
};

/**
 * Check if device is in landscape mode
 */
export const isLandscape = (): boolean => {
  return withDeviceDetectionFallback(
    () => {
      const { width, height } = getScreenDimensions();
      return width > height;
    },
    false
  );
};

/**
 * Get current device type with fine-grained phone distinctions
 * Uses expo-device for PHONE vs TABLET, width for phone size variants
 */
export const getDeviceType = (): DeviceType => {
  return withDeviceDetectionFallback(
    () => {
      // Use expo-device for primary detection
      if (isTablet()) {
        return DeviceType.TABLET;
      }

      // For phones, use width for size variants
      const { width } = getScreenDimensions();

      if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
        return DeviceType.SMALL_PHONE;
      } else if (width <= DEVICE_BREAKPOINTS.MEDIUM_PHONE) {
        return DeviceType.MEDIUM_PHONE;
      }

      return DeviceType.LARGE_PHONE;
    },
    DeviceType.MEDIUM_PHONE
  );
};

/**
 * Responsive spacing multiplier based on device type
 */
export const getSpacingMultiplier = (): number => {
  return withDeviceDetectionFallback(
    () => {
      if (isTablet()) {
        return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_TABLET;
      }

      if (isSmallPhone()) {
        return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_SMALL;
      }

      return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD;
    },
    LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD
  );
};
