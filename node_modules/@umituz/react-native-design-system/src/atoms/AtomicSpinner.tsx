/**
 * AtomicSpinner - Universal Loading Spinner Component
 *
 * Displays loading indicators with flexible configuration
 *
 * Atomic Design Level: ATOM
 * Purpose: Loading state indication across all apps
 *
 * Usage:
 * - Page loading states
 * - Button loading states
 * - Data fetching indicators
 * - Async operation feedback
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText } from './AtomicText';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'white';

export interface AtomicSpinnerProps {
  /** Spinner size preset or custom number */
  size?: SpinnerSize | number;
  /** Spinner color preset or custom hex */
  color?: SpinnerColor | string;
  /** Optional loading text */
  text?: string;
  /** Text position relative to spinner */
  textPosition?: 'bottom' | 'right';
  /** Fill entire parent container */
  fullContainer?: boolean;
  /** Show semi-transparent overlay behind spinner */
  overlay?: boolean;
  /** Overlay background color */
  overlayColor?: string;
  /** Style overrides for container */
  style?: ViewStyle | ViewStyle[];
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// SIZE MAPPINGS
// =============================================================================

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 36,
  xl: 48,
};

const ACTIVITY_SIZE_MAP: Record<SpinnerSize, 'small' | 'large'> = {
  sm: 'small',
  md: 'small',
  lg: 'large',
  xl: 'large',
};

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicSpinner: React.FC<AtomicSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  textPosition = 'bottom',
  fullContainer = false,
  overlay = false,
  overlayColor,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  // Resolve size (scaled)
  const baseSize = typeof size === 'number' ? size : SIZE_MAP[size];
  const resolvedSize = baseSize * tokens.spacingMultiplier;
  
  const activitySize = typeof size === 'number'
    ? (size >= 30 ? 'large' : 'small')
    : ACTIVITY_SIZE_MAP[size];

  // Resolve color
  const resolveColor = (): string => {
    if (color.startsWith('#') || color.startsWith('rgb')) {
      return color;
    }
    const colorMap: Record<SpinnerColor, string> = {
      primary: tokens.colors.primary,
      secondary: tokens.colors.secondary,
      success: tokens.colors.success,
      error: tokens.colors.error,
      warning: tokens.colors.warning,
      white: '#FFFFFF',
    };
    return colorMap[color as SpinnerColor] || tokens.colors.primary;
  };

  const spinnerColor = resolveColor();
  const resolvedOverlayColor = overlayColor || 'rgba(0, 0, 0, 0.5)';

  // Container styles
  const containerStyles: ViewStyle[] = [
    styles.container,
    textPosition === 'right' && { flexDirection: 'row' },
    fullContainer && styles.fullContainer,
    overlay && [styles.overlay, { backgroundColor: resolvedOverlayColor }],
  ].filter(Boolean) as ViewStyle[];

  // Spinner wrapper styles
  const spinnerWrapperStyles: ViewStyle = {
    width: resolvedSize,
    height: resolvedSize,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View
      style={[containerStyles, style]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={text || 'Loading'}
      accessibilityLiveRegion="polite"
    >
      <View style={spinnerWrapperStyles}>
        <ActivityIndicator
          size={activitySize}
          color={spinnerColor}
          testID={testID ? `${testID}-indicator` : undefined}
        />
      </View>
      {text && (
        <AtomicText
          type="bodyMedium"
          style={[
            styles.text,
            textPosition === 'right' 
              ? { marginLeft: 12 * tokens.spacingMultiplier }
              : { marginTop: 12 * tokens.spacingMultiplier },
            { color: overlay ? '#FFFFFF' : tokens.colors.textSecondary },
          ]}
        >
          {text}
        </AtomicText>
      )}
    </View>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
  },
  fullContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  text: {
    textAlign: 'center',
  },
  textBottom: {
    marginTop: 12,
  },
  textRight: {
    marginLeft: 12,
  },
});

// End of file
