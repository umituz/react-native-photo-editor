/**
 * Grid - Responsive Grid Layout (Molecule)
 *
 * Automatic responsive grid that adjusts columns based on device
 * Uses design system responsive utilities
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useResponsive } from '../../responsive';
import { useAppDesignTokens } from '../../theme';

export interface GridProps {
  /** Grid items to render */
  children: React.ReactNode;

  /** Number of columns on mobile (default: 2) */
  mobileColumns?: number;

  /** Number of columns on tablet (default: 4) */
  tabletColumns?: number;

  /** Gap between grid items (uses design tokens spacing) */
  gap?: number;

  /** Container style */
  style?: StyleProp<ViewStyle>;

  /** Test ID for testing */
  testID?: string;
}

/**
 * Responsive grid component
 *
 * @example
 * ```tsx
 * <Grid mobileColumns={2} tabletColumns={4} gap={16}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = ({
  children,
  mobileColumns = 2,
  tabletColumns = 4,
  gap,
  style,
  testID,
}) => {
  const { gridColumns, spacingMultiplier } = useResponsive();
  const tokens = useAppDesignTokens();

  // Calculate responsive columns
  const columns = gridColumns || (mobileColumns && tabletColumns
    ? undefined
    : mobileColumns);

  // Use responsive gap or default
  const responsiveGap = gap ? gap * spacingMultiplier : tokens.spacing.md;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: responsiveGap,
        },
      }),
    [responsiveGap]
  );

  // Convert children to array for mapping
  const childArray = React.Children.toArray(children);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {childArray.map((child, index) => (
        <View
          key={index}
          style={{
            flex: columns ? 1 / columns - 0.01 : undefined,
            minWidth: columns ? `${100 / columns - 1}%` : undefined,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};
