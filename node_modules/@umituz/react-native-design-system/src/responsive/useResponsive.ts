/**
 * useResponsive Hook
 *
 * React Hook for accessing responsive utilities with real-time dimension updates
 * and safe area insets integration.
 *
 * Usage:
 * ```tsx
 * const { logoSize, inputHeight, fabPosition, isSmallDevice } = useResponsive();
 * ```
 */

import { useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "../safe-area";
import {
  getResponsiveLogoSize,
  getResponsiveInputHeight,
  getResponsiveHorizontalPadding,
  getResponsiveVerticalPadding,
  getScreenLayoutConfig,
  getResponsiveBottomPosition,
  getResponsiveFABPosition,
  getResponsiveTabBarConfig,
  getResponsiveModalMaxHeight,
  getResponsiveMinModalHeight,
  getResponsiveModalLayout,
  getResponsiveBottomSheetLayout,
  getResponsiveDialogLayout,
  getResponsiveIconContainerSize,
  getResponsiveGridColumns,
  getResponsiveMaxWidth,
  getResponsiveFontSize,
  type ResponsiveModalLayout,
  type ResponsiveBottomSheetLayout,
  type ResponsiveDialogLayout,
  type ResponsiveTabBarConfig,
  type ScreenLayoutConfig,
} from "./responsive";
import {
  isSmallPhone,
  isTablet,
  isLandscape,
  getDeviceType,
  DeviceType,
  getSpacingMultiplier,
} from "../device/detection";
import { getMinTouchTarget } from "./platformConstants";

export interface UseResponsiveReturn {
  // Device info
  width: number;
  height: number;
  isSmallDevice: boolean;
  isTabletDevice: boolean;
  isLandscapeDevice: boolean;
  deviceType: DeviceType;

  // Safe area insets
  insets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };

  // Responsive sizes
  logoSize: number;
  inputHeight: number;
  iconContainerSize: number;
  maxContentWidth: number;
  minTouchTarget: number;

  // Responsive positioning
  horizontalPadding: number;
  verticalPadding: number;
  bottomPosition: number;
  fabPosition: { bottom: number; right: number };

  // Screen layout config (complete configuration for ScreenLayout)
  screenLayoutConfig: ScreenLayoutConfig;

  // Responsive layout
  modalMaxHeight: string;
  modalMinHeight: number;
  gridColumns: number;
  spacingMultiplier: number;
  tabBarConfig: ResponsiveTabBarConfig;

  // Modal layouts (complete configurations)
  modalLayout: ResponsiveModalLayout;
  bottomSheetLayout: ResponsiveBottomSheetLayout;
  dialogLayout: ResponsiveDialogLayout;

  // Onboarding specific responsive values
  onboardingIconSize: number;
  onboardingIconMarginTop: number;
  onboardingIconMarginBottom: number;
  onboardingTitleMarginBottom: number;
  onboardingDescriptionMarginTop: number;
  onboardingTextPadding: number;

  // Utility functions
  getLogoSize: (baseSize?: number) => number;
  getInputHeight: (baseHeight?: number) => number;
  getIconSize: (baseSize?: number) => number;
  getMaxWidth: (baseWidth?: number) => number;
  getFontSize: (baseFontSize: number) => number;
  getGridCols: (mobile?: number, tablet?: number) => number;
}

/**
 * Hook for responsive design utilities
 * Automatically updates when screen dimensions or orientation changes
 */
export const useResponsive = (): UseResponsiveReturn => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Memoize utility functions to prevent unnecessary re-renders
  const getLogoSize = useCallback(
    (baseSize?: number) => getResponsiveLogoSize(baseSize),
    [],
  );
  const getInputHeight = useCallback(
    (baseHeight?: number) => getResponsiveInputHeight(baseHeight),
    [],
  );
  const getIconSize = useCallback(
    (baseSize?: number) => getResponsiveIconContainerSize(baseSize),
    [],
  );
  const getMaxWidth = useCallback(
    (baseWidth?: number) => getResponsiveMaxWidth(baseWidth),
    [],
  );
  const getFontSize = useCallback(
    (baseFontSize: number) => getResponsiveFontSize(baseFontSize),
    [],
  );
  const getGridCols = useCallback(
    (mobile?: number, tablet?: number) =>
      getResponsiveGridColumns(mobile, tablet),
    [],
  );

  // Memoize responsive values to prevent unnecessary recalculations
  const responsiveValues = useMemo(
    () => ({
      // Device info
      width,
      height,
      isSmallDevice: isSmallPhone(),
      isTabletDevice: isTablet(),
      isLandscapeDevice: isLandscape(),
      deviceType: getDeviceType(),

      // Safe area insets
      insets,

      // Responsive sizes (with default values)
      logoSize: getResponsiveLogoSize(),
      inputHeight: getResponsiveInputHeight(),
      iconContainerSize: getResponsiveIconContainerSize(),
      maxContentWidth: getResponsiveMaxWidth(),
      minTouchTarget: getMinTouchTarget(),

      // Responsive positioning
      horizontalPadding: getResponsiveHorizontalPadding(undefined, insets),
      verticalPadding: getResponsiveVerticalPadding(insets),
      bottomPosition: getResponsiveBottomPosition(undefined, insets),
      fabPosition: getResponsiveFABPosition(insets),

      // Screen layout config (complete configuration for ScreenLayout)
      screenLayoutConfig: getScreenLayoutConfig(insets),

      // Responsive layout
      modalMaxHeight: getResponsiveModalMaxHeight(),
      modalMinHeight: getResponsiveMinModalHeight(),
      gridColumns: getResponsiveGridColumns(),
      spacingMultiplier: getSpacingMultiplier(),
      tabBarConfig: getResponsiveTabBarConfig(insets),

      // Modal layouts (complete configurations)
      modalLayout: getResponsiveModalLayout(),
      bottomSheetLayout: getResponsiveBottomSheetLayout(),
      dialogLayout: getResponsiveDialogLayout(),

      // Onboarding specific responsive values
      onboardingIconSize: getIconSize(64),
      onboardingIconMarginTop: getSpacingMultiplier() * 24,
      onboardingIconMarginBottom: getSpacingMultiplier() * 16,
      onboardingTitleMarginBottom: getSpacingMultiplier() * 16,
      onboardingDescriptionMarginTop: getSpacingMultiplier() * 12,
      onboardingTextPadding: getSpacingMultiplier() * 20,

      // Utility functions
      getLogoSize,
      getInputHeight,
      getIconSize,
      getMaxWidth,
      getFontSize,
      getGridCols,
    }),
    [width, height, insets],
  );

  return responsiveValues;
};
