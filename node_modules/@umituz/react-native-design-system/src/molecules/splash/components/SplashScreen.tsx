/**
 * Splash Screen Component
 * Pure prop-driven component with theme-aware defaults
 */

import React, { useEffect, useState, useCallback } from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "../../../safe-area";
import { AtomicText, AtomicSpinner } from "../../../atoms";
import { useAppDesignTokens } from "../../../theme";
import type { SplashScreenProps, SplashColors } from "../types";
import { SPLASH_CONSTANTS } from "../constants";

declare const __DEV__: boolean;

export const SplashScreen: React.FC<SplashScreenProps> = ({
  icon,
  appName,
  tagline,
  colors: customColors,
  gradientColors,
  visible = true,
  maxDuration,
  onTimeout,
  onReady,
  style,
}: SplashScreenProps) => {
  // ALL HOOKS MUST BE AT THE TOP (Rules of Hooks)
  const insets = useSafeAreaInsets();
  const tokens = useAppDesignTokens();
  const [timedOut, setTimedOut] = useState(false);

  const handleTimeout = useCallback(() => {
    if (__DEV__) {
      console.log(`[SplashScreen] Timeout reached: ${maxDuration}ms`);
    }
    setTimedOut(true);
    onTimeout?.();
  }, [maxDuration, onTimeout]);

  useEffect(() => {
    if (__DEV__) {
      console.log("[SplashScreen] Mounted", { appName, visible });
    }
    onReady?.();
  }, [appName, visible, onReady]);

  useEffect(() => {
    if (!maxDuration || !visible) return;

    const timer = setTimeout(handleTimeout, maxDuration);
    return () => clearTimeout(timer);
  }, [maxDuration, visible, handleTimeout]);

  // ALL HOOKS ABOVE - NOW SAFE TO USE OTHER LOGIC

  // Derive colors from tokens if not provided (theme-aware defaults)
  const colors: SplashColors = customColors ?? {
    background: tokens.colors.backgroundPrimary,
    text: tokens.colors.textPrimary,
    iconPlaceholder: `${tokens.colors.textPrimary}30`, // 30% opacity
  };

  if (__DEV__) {
    console.log('[SplashScreen] Component render:', {
      visible,
      appName,
      tagline,
      hasIcon: !!icon,
      hasCustomColors: !!customColors,
      resolvedColors: colors,
      hasGradient: !!gradientColors,
    });
  }

  if (!visible) {
    if (__DEV__) {
      console.log("[SplashScreen] Not visible (visible=false), returning null");
    }
    return null;
  }

  if (__DEV__) {
    console.log("[SplashScreen] Rendering splash screen UI");
  }

  const iconPlaceholderColor = colors.iconPlaceholder ?? `${colors.text}30`;

  const contentStyle = {
    paddingTop: insets.top + SPLASH_CONSTANTS.CONTENT_PADDING,
    paddingBottom: insets.bottom + SPLASH_CONSTANTS.CONTENT_PADDING,
  };

  const content = (
    <View style={[styles.content, contentStyle]}>
      <View style={styles.center}>
        {icon ? (
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        ) : (
          <View
            style={[
              styles.iconPlaceholder,
              { backgroundColor: iconPlaceholderColor },
            ]}
          />
        )}

        {appName ? (
          <AtomicText
            type="displaySmall"
            style={[styles.title, { color: colors.text }]}
          >
            {appName}
          </AtomicText>
        ) : null}

        {tagline ? (
          <AtomicText
            type="bodyLarge"
            style={[styles.tagline, { color: colors.text }]}
          >
            {tagline}
          </AtomicText>
        ) : null}

        {/* Always show loading indicator during initialization */}
        <View style={styles.loadingContainer}>
          <AtomicSpinner
            size="lg"
            color={colors.text}
            style={styles.loadingIndicator}
          />
        </View>

        {timedOut && __DEV__ ? (
          <AtomicText
            type="labelSmall"
            style={[styles.timeoutText, { color: colors.text }]}
          >
            Initialization timeout
          </AtomicText>
        ) : null}
      </View>
    </View>
  );

  if (gradientColors && gradientColors.length >= 2) {
    return (
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        style={[styles.container, style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {content}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPLASH_CONSTANTS.CONTENT_PADDING,
  },
  icon: {
    width: SPLASH_CONSTANTS.ICON_SIZE,
    height: SPLASH_CONSTANTS.ICON_SIZE,
    marginBottom: SPLASH_CONSTANTS.CONTENT_PADDING,
  },
  iconPlaceholder: {
    width: SPLASH_CONSTANTS.ICON_PLACEHOLDER_SIZE,
    height: SPLASH_CONSTANTS.ICON_PLACEHOLDER_SIZE,
    borderRadius: SPLASH_CONSTANTS.ICON_PLACEHOLDER_SIZE / 2,
    marginBottom: SPLASH_CONSTANTS.CONTENT_PADDING,
  },
  title: {
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 8,
  },
  tagline: {
    textAlign: "center",
    opacity: 0.9,
  },
  loadingContainer: {
    marginTop: SPLASH_CONSTANTS.CONTENT_PADDING,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  loadingIndicator: {
    opacity: 0.8,
  },
  timeoutText: {
    textAlign: "center",
    marginTop: 16,
  },
});
