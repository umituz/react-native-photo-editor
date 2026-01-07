/**
 * ScreenLayout - Universal Screen Container Component
 *
 * Provides consistent layout structure for all screens:
 * - SafeAreaView with configurable edges
 * - Optional ScrollView for content
 * - Theme-aware background colors
 * - Optional header/footer slots
 * - Consistent spacing and padding
 *
 * Usage:
 * <ScreenLayout>
 *   <View>Your content here</View>
 * </ScreenLayout>
 *
 * Advanced:
 * <ScreenLayout
 *   scrollable={false}
 *   edges={['top', 'bottom']}
 *   header={<CustomHeader />}
 * >
 *   <View>Content</View>
 * </ScreenLayout>
 */

import React, { useMemo } from 'react';
import { View, ScrollView, StyleSheet, type ViewStyle, type RefreshControlProps } from 'react-native';
import { SafeAreaView, useSafeAreaInsets, type Edge } from '../../safe-area';
import { useAppDesignTokens } from '../../theme';
import { getScreenLayoutConfig } from '../../responsive/responsiveLayout';
import { AtomicKeyboardAvoidingView } from '../../atoms';

/**
 * NOTE: This component now works in conjunction with the SafeAreaProvider
 * from our safe-area module. The SafeAreaProvider should wrap your app root:
 * 
 * import { SafeAreaProvider } from '../../index';
 * 
 * function App() {
 *   return (
 *     <SafeAreaProvider>
 *       <YourApp />
 *     </SafeAreaProvider>
 *   );
 * }
 */

export interface ScreenLayoutProps {
  /**
   * Content to render inside the layout
   */
  children: React.ReactNode;

  /**
   * Enable scrolling (default: true)
   * Set to false for screens with custom scroll logic
   */
  scrollable?: boolean;

  /**
   * Safe area edges to apply (default: ['top'])
   * Common values:
   * - ['top'] - For screens with bottom tabs
   * - ['top', 'bottom'] - For modal screens
   * - [] - No safe area (use cautiously)
   */
  edges?: Edge[];

  /**
   * Optional header component
   * Rendered above scrollable content
   */
  header?: React.ReactNode;

  /**
   * Optional footer component
   * Rendered below scrollable content
   */
  footer?: React.ReactNode;

  /**
   * Override background color
   * If not provided, uses theme's backgroundPrimary
   */
  backgroundColor?: string;

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;

  /**
   * Custom content container style (for ScrollView)
   */
  contentContainerStyle?: ViewStyle;

  /**
   * Test ID for automation
   */
  testID?: string;

  /**
   * Hide vertical scroll indicator (default: false)
   */
  hideScrollIndicator?: boolean;

  /**
   * Enable keyboard avoiding behavior (default: false)
   * Useful for screens with inputs
   */
  keyboardAvoiding?: boolean;

  /**
   * Accessibility label for the layout
   */
  accessibilityLabel?: string;

  /**
   * Accessibility hint for the layout
   */
  accessibilityHint?: string;

  /**
   * Whether the layout is accessible
   */
  accessible?: boolean;

  /**
   * Enable responsive content width and centering (default: true)
   */
  responsiveEnabled?: boolean;

  /**
   * Maximum content width override
   */
  maxWidth?: number;

  /**
   * RefreshControl component for pull-to-refresh
   */
  refreshControl?: React.ReactElement<RefreshControlProps>;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  scrollable = true,
  edges = ['top'],
  header,
  footer,
  backgroundColor,
  containerStyle,
  contentContainerStyle,
  testID,
  hideScrollIndicator = false,
  keyboardAvoiding = false,
  responsiveEnabled = true,
  maxWidth,
  refreshControl,
}) => {
  // Automatically uses current theme from global store
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();

  // Get all responsive layout values from centralized config
  const layoutConfig = useMemo(
    () => getScreenLayoutConfig(insets),
    [insets]
  );

  // Use provided maxWidth or responsive default
  const finalMaxWidth = maxWidth || (responsiveEnabled ? layoutConfig.maxContentWidth : undefined);
  const horizontalPadding = responsiveEnabled ? layoutConfig.horizontalPadding : tokens.spacing.md;
  const verticalPadding = responsiveEnabled ? layoutConfig.verticalPadding : tokens.spacing.lg;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    responsiveWrapper: {
      flex: 1,
      width: '100%',
      ...(finalMaxWidth ? { maxWidth: finalMaxWidth, alignSelf: 'center' as const } : {}),
    },
    content: {
      flex: 1,
      paddingTop: verticalPadding,
      paddingHorizontal: horizontalPadding,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: verticalPadding,
      paddingHorizontal: horizontalPadding,
      paddingBottom: verticalPadding,
    },
  }), [tokens, finalMaxWidth, horizontalPadding, verticalPadding]);

  const bgColor = backgroundColor || tokens.colors.backgroundPrimary;

  // Content wrapper - optionally with KeyboardAvoidingView
  // Uses 'padding' behavior which works consistently cross-platform
  const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children: wrapperChildren }) => {
    if (keyboardAvoiding) {
      return (
        <AtomicKeyboardAvoidingView
          style={styles.keyboardAvoidingView}
        >
          {wrapperChildren}
        </AtomicKeyboardAvoidingView>
      );
    }
    return <>{wrapperChildren}</>;
  };

  // Non-scrollable layout
  if (!scrollable) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
        edges={edges}
        testID={testID}
      >
        <ContentWrapper>
          <View style={styles.responsiveWrapper}>
            {header}
            <View style={[styles.content, contentContainerStyle]}>
              {children}
            </View>
            {footer}
          </View>
        </ContentWrapper>
      </SafeAreaView>
    );
  }

  // Scrollable layout (default)
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor }, containerStyle]}
      edges={edges}
      testID={testID}
    >
      <ContentWrapper>
        <View style={styles.responsiveWrapper}>
          {header}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
            showsVerticalScrollIndicator={!hideScrollIndicator}
            keyboardShouldPersistTaps={keyboardAvoiding ? 'handled' : 'never'}
            refreshControl={refreshControl}
          >
            {children}
          </ScrollView>
          {footer}
        </View>
      </ContentWrapper>
    </SafeAreaView>
  );
};
