/**
 * AtomicIcon - Theme-aware Icon Component
 *
 * Uses @expo/vector-icons/Ionicons internally
 * Adds theme-aware semantic colors and background support
 */

import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useAppDesignTokens } from '../theme';
import {
  type IconSize as BaseIconSize,
  type IoniconsName
} from "./AtomicIcon.types";

// Re-export IconSize for convenience
export type IconSize = BaseIconSize;

const FALLBACK_ICON = "help-circle-outline";

// Semantic color names that map to theme tokens
export type IconColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "onSurface"
  | "surfaceVariant"
  | "onPrimary"
  | "onSecondary"
  | "textInverse"
  | "textPrimary"
  | "textSecondary"
  | "textTertiary"
  | "onSurfaceVariant";

/**
 * IconName can be a valid Ionicons name or any string (for custom SVGs)
 */
export type IconName = IoniconsName | string;

export interface AtomicIconProps {
  /** Icon name (Ionicons) */
  name?: IconName;
  /** Semantic size preset */
  size?: IconSize;
  /** Custom size in pixels (overrides size) */
  customSize?: number;
  /** Semantic color from theme */
  color?: IconColor;
  /** Custom color (overrides color) */
  customColor?: string;
  /** Custom SVG path for generic icons */
  svgPath?: string;
  /** ViewBox for custom SVG (default: 0 0 24 24) */
  svgViewBox?: string;
  /** Add circular background */
  withBackground?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID */
  testID?: string;
  /** Additional styles */
  style?: StyleProp<ViewStyle>;
}

const getSemanticColor = (
  color: IconColor,
  tokens: ReturnType<typeof useAppDesignTokens>
): string => {
  const colorMap: Record<IconColor, string> = {
    primary: tokens.colors.primary,
    secondary: tokens.colors.secondary,
    success: tokens.colors.success,
    warning: tokens.colors.warning,
    error: tokens.colors.error,
    info: tokens.colors.info,
    onSurface: tokens.colors.onSurface,
    surfaceVariant: tokens.colors.surfaceVariant,
    onPrimary: tokens.colors.onPrimary,
    onSecondary: tokens.colors.onSecondary,
    textInverse: tokens.colors.textInverse,
    textPrimary: tokens.colors.textPrimary,
    textSecondary: tokens.colors.textSecondary,
    textTertiary: tokens.colors.textTertiary,
    onSurfaceVariant: tokens.colors.onSurfaceVariant,
  };
  return colorMap[color];
};

/**
 * Theme-aware icon component
 *
 * @example
 * <AtomicIcon name="heart-outline" size="md" color="primary" />
 * <AtomicIcon name="star" customSize={32} customColor="#FFD700" />
 * <AtomicIcon name="settings" size="lg" withBackground />
 */
export const AtomicIcon: React.FC<AtomicIconProps> = React.memo(({
  name,
  size = "md",
  customSize,
  color,
  customColor,
  withBackground = false,
  backgroundColor,
  svgPath,
  svgViewBox = "0 0 24 24",
  accessibilityLabel,
  testID,
  style,
}) => {
  const tokens = useAppDesignTokens();

  // Calculate size
  const baseSize = customSize ?? size;
  const iconSizesMap = tokens.iconSizes as Record<string, number>;
  const sizeInPixels: number = typeof baseSize === 'number'
    ? baseSize * tokens.spacingMultiplier
    : iconSizesMap[baseSize] ?? iconSizesMap['md'] ?? 24;

  // Calculate color
  const iconColor = customColor
    ? customColor
    : color
      ? getSemanticColor(color, tokens)
      : tokens.colors.textPrimary;

  // Validate icon - use fallback and log warning in DEV if invalid
  const isInvalidIcon = name && !(name in Ionicons.glyphMap);
  const iconName = name && !isInvalidIcon ? name : FALLBACK_ICON;

  if (__DEV__ && isInvalidIcon) {
    console.warn(`[DesignSystem] Invalid icon name: "${name}". Falling back to "${FALLBACK_ICON}"`);
  }

  const iconElement = svgPath ? (
    <Svg
      viewBox={svgViewBox}
      width={sizeInPixels}
      height={sizeInPixels}
      key="custom-svg-icon"
    >
      <Path
        d={svgPath}
        fill={iconColor}
      />
    </Svg>
  ) : (
    <Ionicons
      name={iconName as keyof typeof Ionicons.glyphMap}
      size={sizeInPixels}
      color={iconColor}
      testID={testID ? `${testID}-icon` : undefined}
      style={{
        padding: 4, // Prevent font truncation
        includeFontPadding: false, // Android specific
      }}
    />
  );

  if (withBackground) {
    const bgColor = backgroundColor || tokens.colors.surfaceVariant;
    const containerSize = sizeInPixels + 16;

    return (
      <View
        style={[
          styles.backgroundContainer,
          {
            width: containerSize,
            height: containerSize,
            borderRadius: containerSize / 2,
            backgroundColor: bgColor,
          },
          style,
        ]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      >
        {iconElement}
      </View>
    );
  }

  return (
    <View accessibilityLabel={accessibilityLabel} testID={testID} style={style}>
      {iconElement}
    </View>
  );
});

AtomicIcon.displayName = "AtomicIcon";

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});


