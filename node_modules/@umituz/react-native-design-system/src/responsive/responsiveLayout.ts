/**
 * Responsive Layout Utilities
 * Layout utilities for positioning and spacing.
 */

import { isTablet, isSmallPhone, getSpacingMultiplier } from '../device/detection';
import { LAYOUT_CONSTANTS, SIZE_CONSTRAINTS } from './config';
import { validateNumber, validateSafeAreaInsets } from './validation';

/**
 * Check if device is tablet-sized (for responsive layouts)
 * Uses expo-device based detection for accuracy
 */
const checkIsTabletSize = (): boolean => isTablet();

/**
 * Screen layout configuration for ScreenLayout component
 */
export interface ScreenLayoutConfig {
  maxContentWidth: number | undefined;
  horizontalPadding: number;
  verticalPadding: number;
  spacingMultiplier: number;
}

/**
 * Get complete screen layout configuration
 * Returns all responsive values needed for ScreenLayout
 */
export const getScreenLayoutConfig = (
  insets: { left?: number; right?: number; top?: number; bottom?: number } = {}
): ScreenLayoutConfig => {
  try {
    const isTabletDevice = checkIsTabletSize();
    const spacingMultiplier = getSpacingMultiplier();

    return {
      maxContentWidth: isTabletDevice ? SIZE_CONSTRAINTS.CONTENT_MAX_TABLET : undefined,
      horizontalPadding: getResponsiveHorizontalPadding(LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE, insets),
      verticalPadding: getResponsiveVerticalPadding(insets),
      spacingMultiplier,
    };
  } catch {
    return {
      maxContentWidth: undefined,
      horizontalPadding: LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
      verticalPadding: LAYOUT_CONSTANTS.VERTICAL_PADDING_STANDARD,
      spacingMultiplier: LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD,
    };
  }
};

/**
 * Responsive vertical padding
 * Adjusts based on device type and safe area insets
 */
export const getResponsiveVerticalPadding = (
  insets: { top?: number; bottom?: number } = { top: 0, bottom: 0 }
): number => {
  try {
    validateSafeAreaInsets(insets);
    const { top = 0 } = insets;
    const isTabletDevice = checkIsTabletSize();
    const isSmall = isSmallPhone();
    const spacingMultiplier = getSpacingMultiplier();

    // Base padding adjusted by device type
    let basePadding: number = LAYOUT_CONSTANTS.VERTICAL_PADDING_STANDARD;
    if (isTabletDevice) {
      basePadding = LAYOUT_CONSTANTS.VERTICAL_PADDING_TABLET;
    } else if (isSmall) {
      basePadding = LAYOUT_CONSTANTS.VERTICAL_PADDING_SMALL;
    }

    // Apply spacing multiplier for consistency
    const adjustedPadding = basePadding * spacingMultiplier;

    // Ensure minimum padding respects safe area
    return Math.max(adjustedPadding, top > 0 ? 8 : adjustedPadding);
  } catch {
    return LAYOUT_CONSTANTS.VERTICAL_PADDING_STANDARD;
  }
};

/**
 * Responsive horizontal padding
 */
export const getResponsiveHorizontalPadding = (
  basePadding: number = LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
  insets: { left?: number; right?: number } = { left: 0, right: 0 }
): number => {
  try {
    const validatedBasePadding = validateNumber(basePadding, 'basePadding', 0, 100);
    validateSafeAreaInsets(insets);

    const { left = 0, right = 0 } = insets;
    const isTabletDevice = checkIsTabletSize();

    if (isTabletDevice) {
      const tabletPadding = validatedBasePadding * LAYOUT_CONSTANTS.SPACING_MULTIPLIER_TABLET;
      return Math.max(
        tabletPadding,
        left + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE,
        right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
      );
    }

    return Math.max(
      validatedBasePadding,
      left + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET,
      right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
    );
  } catch {
    return 16;
  }
};

/**
 * Responsive bottom positioning
 */
export const getResponsiveBottomPosition = (
  basePosition: number = LAYOUT_CONSTANTS.BOTTOM_POSITION_BASE,
  insets: { bottom?: number } = { bottom: 0 }
): number => {
  try {
    const validatedBasePosition = validateNumber(basePosition, 'basePosition', 0, 500);
    validateSafeAreaInsets(insets);

    const { bottom = 0 } = insets;
    return Math.max(validatedBasePosition, bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET);
  } catch {
    return 32;
  }
};

/**
 * Responsive FAB position
 */
export const getResponsiveFABPosition = (
  insets: { bottom?: number; right?: number } = { bottom: 0, right: 0 }
): { bottom: number; right: number } => {
  try {
    validateSafeAreaInsets(insets);
    const { bottom = 0, right = 0 } = insets;
    const isTabletDevice = checkIsTabletSize();

    if (isTabletDevice) {
      return {
        bottom: Math.max(
          LAYOUT_CONSTANTS.FAB_BOTTOM_TABLET,
          bottom + LAYOUT_CONSTANTS.TAB_BAR_OFFSET
        ),
        right: Math.max(
          LAYOUT_CONSTANTS.FAB_RIGHT_TABLET,
          right + LAYOUT_CONSTANTS.HORIZONTAL_PADDING_BASE
        ),
      };
    }

    return {
      bottom: Math.max(
        LAYOUT_CONSTANTS.TAB_BAR_OFFSET,
        bottom + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
      right: Math.max(
        LAYOUT_CONSTANTS.FAB_RIGHT_PHONE,
        right + LAYOUT_CONSTANTS.SAFE_AREA_OFFSET
      ),
    };
  } catch {
    return {
      bottom: LAYOUT_CONSTANTS.TAB_BAR_OFFSET,
      right: LAYOUT_CONSTANTS.FAB_RIGHT_PHONE,
    };
  }
};

/**
 * Tab bar height constants
 */
const TAB_BAR_CONSTANTS = {
  BASE_HEIGHT_PHONE: 60,
  BASE_HEIGHT_TABLET: 70,
  MIN_PADDING_BOTTOM: 8,
  MIN_PADDING_TOP: 8,
  ICON_SIZE_PHONE: 24,
  ICON_SIZE_TABLET: 28,
  FAB_SIZE_PHONE: 64,
  FAB_SIZE_TABLET: 72,
  FAB_OFFSET_Y_PHONE: -24,
  FAB_OFFSET_Y_TABLET: -28,
} as const;

/**
 * Responsive tab bar configuration
 */
export interface ResponsiveTabBarConfig {
  height: number;
  paddingBottom: number;
  paddingTop: number;
  iconSize: number;
  fabSize: number;
  fabOffsetY: number;
}

/**
 * Get responsive tab bar height based on device and safe area
 */
export const getResponsiveTabBarHeight = (
  insets: { bottom?: number } = { bottom: 0 }
): number => {
  try {
    validateSafeAreaInsets(insets);
    const { bottom = 0 } = insets;
    const isTabletDevice = checkIsTabletSize();

    const baseHeight = isTabletDevice
      ? TAB_BAR_CONSTANTS.BASE_HEIGHT_TABLET
      : TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE;

    const bottomPadding = Math.max(bottom, TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM);

    return baseHeight + bottomPadding;
  } catch {
    return TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE + TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM;
  }
};

/**
 * Get complete responsive tab bar configuration
 */
export const getResponsiveTabBarConfig = (
  insets: { bottom?: number } = { bottom: 0 }
): ResponsiveTabBarConfig => {
  try {
    validateSafeAreaInsets(insets);
    const { bottom = 0 } = insets;
    const isTabletSize = checkIsTabletSize();

    const baseHeight = isTabletSize
      ? TAB_BAR_CONSTANTS.BASE_HEIGHT_TABLET
      : TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE;

    const paddingBottom = Math.max(bottom, TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM);

    return {
      height: baseHeight + paddingBottom,
      paddingBottom,
      paddingTop: TAB_BAR_CONSTANTS.MIN_PADDING_TOP,
      iconSize: isTabletSize
        ? TAB_BAR_CONSTANTS.ICON_SIZE_TABLET
        : TAB_BAR_CONSTANTS.ICON_SIZE_PHONE,
      fabSize: isTabletSize
        ? TAB_BAR_CONSTANTS.FAB_SIZE_TABLET
        : TAB_BAR_CONSTANTS.FAB_SIZE_PHONE,
      fabOffsetY: isTabletSize
        ? TAB_BAR_CONSTANTS.FAB_OFFSET_Y_TABLET
        : TAB_BAR_CONSTANTS.FAB_OFFSET_Y_PHONE,
    };
  } catch {
    return {
      height: TAB_BAR_CONSTANTS.BASE_HEIGHT_PHONE + TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM,
      paddingBottom: TAB_BAR_CONSTANTS.MIN_PADDING_BOTTOM,
      paddingTop: TAB_BAR_CONSTANTS.MIN_PADDING_TOP,
      iconSize: TAB_BAR_CONSTANTS.ICON_SIZE_PHONE,
      fabSize: TAB_BAR_CONSTANTS.FAB_SIZE_PHONE,
      fabOffsetY: TAB_BAR_CONSTANTS.FAB_OFFSET_Y_PHONE,
    };
  }
};
