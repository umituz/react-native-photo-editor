/**
 * iPad Device Detection Utilities
 *
 * Uses expo-device for system-level tablet detection,
 * then uses screen dimensions for iPad-specific sub-categories.
 */

import { Dimensions } from 'react-native';
import { IPAD_BREAKPOINTS } from './iPadBreakpoints';
import { isTablet, isLandscape } from './deviceDetection';

/**
 * Detect if the current device is an iPad (or Android tablet)
 * Uses expo-device for accurate system-level detection
 */
export function isIPad(): boolean {
    return isTablet();
}

/**
 * Detect if the current device is an iPad mini
 */
export function isIPadMini(): boolean {
    if (!isIPad()) return false;

    const { width, height } = Dimensions.get('window');
    const minWidth = Math.min(width, height);
    return minWidth < IPAD_BREAKPOINTS.IPAD_AIR;
}

/**
 * Detect if the current device is an iPad Pro (12.9")
 */
export function isIPadPro(): boolean {
    if (!isIPad()) return false;

    const { width, height } = Dimensions.get('window');
    const minWidth = Math.min(width, height);
    return minWidth >= IPAD_BREAKPOINTS.IPAD_11_PRO;
}

/**
 * Check if tablet device is in landscape orientation
 * Uses shared isLandscape detection for consistency
 */
export function isIPadLandscape(): boolean {
    return isLandscape();
}
