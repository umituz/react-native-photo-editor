/**
 * Common Styles - Reusable Style Patterns
 *
 * Centralized style utilities to reduce duplication across screens.
 * These styles are composable and follow DRY principles.
 *
 * Usage:
 * ```typescript
 * import { useCommonStyles } from '@umituz/react-native-design-system-theme';
 *
 * const MyComponent = () => {
 *   const commonStyles = useCommonStyles();
 *   return <View style={commonStyles.screenContainer}>...</View>;
 * };
 * ```
 */

import { useMemo } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from './useAppDesignTokens';

/**
 * Hook to get common styles with dynamic theme support
 * Memoized to prevent unnecessary re-renders
 */
export const useCommonStyles = () => {
  const tokens = useAppDesignTokens();
  
  return useMemo(() => ({
    // ========================================================================
    // SCREEN CONTAINERS
    // ========================================================================
    /**
     * Standard full-screen container
     * Most common pattern: flex: 1 with background color
     */
    screenContainer: {
      flex: 1,
      backgroundColor: tokens.colors.backgroundPrimary,
    } as ViewStyle,
    
    /**
     * Basic flex container without background
     * Use when background is set elsewhere or not needed
     */
    flexContainer: {
      flex: 1,
    } as ViewStyle,
    
    /**
     * Screen container with secondary background
     */
    screenContainerSecondary: {
      flex: 1,
      backgroundColor: tokens.colors.backgroundSecondary,
    } as ViewStyle,
    
    // ========================================================================
    // SCROLL CONTAINERS
    // ========================================================================
    /**
     * Standard ScrollView wrapper
     */
    scrollView: {
      flex: 1,
    } as ViewStyle,
    
    /**
     * ScrollView content container with standard padding
     */
    scrollContent: {
      paddingHorizontal: tokens.spacing.lg,
      paddingBottom: tokens.spacing.xl,
    } as ViewStyle,
    
    /**
     * ScrollView content that grows to fill available space
     */
    scrollContentGrow: {
      flexGrow: 1,
      padding: tokens.spacing.lg,
    } as ViewStyle,
    
    /**
     * Centered scroll content (for forms, onboarding screens)
     */
    scrollContentCentered: {
      flexGrow: 1,
      padding: tokens.spacing.lg,
      justifyContent: 'center',
    } as ViewStyle,
    
    // ========================================================================
    // LAYOUT UTILITIES
    // ========================================================================
    /**
     * Centered container - both horizontal and vertical
     * Perfect for empty states, splash screens
     */
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    
    /**
     * Centered container with padding
     */
    centerContainerPadded: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: tokens.spacing.xl,
    } as ViewStyle,
    
    /**
     * Horizontal row layout
     */
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    
    /**
     * Horizontal row with space between
     */
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as ViewStyle,
    
    /**
     * Horizontal row centered
     */
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    
    // ========================================================================
    // PADDING UTILITIES
    // ========================================================================
    /**
     * Standard horizontal padding
     */
    paddedHorizontal: {
      paddingHorizontal: tokens.spacing.lg,
    } as ViewStyle,
    
    /**
     * Standard vertical padding
     */
    paddedVertical: {
      paddingVertical: tokens.spacing.lg,
    } as ViewStyle,
    
    /**
     * Standard padding all sides
     */
    padded: {
      padding: tokens.spacing.lg,
    } as ViewStyle,
    
    // ========================================================================
    // SECTION STYLES
    // ========================================================================
    /**
     * Standard section container
     */
    section: {
      marginBottom: tokens.spacing.xl,
    } as ViewStyle,
    
    /**
     * Section with padding
     */
    sectionPadded: {
      marginBottom: tokens.spacing.xl,
      paddingHorizontal: tokens.spacing.lg,
    } as ViewStyle,
    
    // ========================================================================
    // TEXT STYLES
    // ========================================================================
    /**
     * Screen title - primary heading
     */
    screenTitle: {
      ...tokens.typography.headingLarge,
      color: tokens.colors.textPrimary,
      marginBottom: tokens.spacing.sm,
    } as TextStyle,
    
    /**
     * Section title
     */
    sectionTitle: {
      ...tokens.typography.headingMedium,
      color: tokens.colors.textPrimary,
      marginBottom: tokens.spacing.md,
    } as TextStyle,
    
    /**
     * Subtitle/description text
     */
    subtitle: {
      ...tokens.typography.bodyMedium,
      color: tokens.colors.textSecondary,
      textAlign: 'center',
    } as TextStyle,
    
    /**
     * Body text
     */
    bodyText: {
      ...tokens.typography.bodyMedium,
      color: tokens.colors.textPrimary,
    } as TextStyle,
    
    /**
     * Secondary text (muted)
     */
    secondaryText: {
      ...tokens.typography.bodySmall,
      color: tokens.colors.textSecondary,
    } as TextStyle,
    
    // ========================================================================
    // FORM STYLES
    // ========================================================================
    /**
     * Form container
     */
    form: {
      width: '100%',
    } as ViewStyle,
    
    /**
     * Form header section
     */
    formHeader: {
      alignItems: 'center',
      marginBottom: tokens.spacing.xl,
    } as ViewStyle,
  }), [tokens]);
};
