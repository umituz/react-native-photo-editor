/**
 * StepHeader Component
 * Header component for step-by-step flows with title and subtitle
 *
 * @package @umituz/react-native-design-system
 */

import React, { useMemo } from "react";
import { View, StyleSheet, type ViewStyle, type StyleProp } from "react-native";
import { AtomicText } from "../../atoms/AtomicText";
import { useAppDesignTokens } from "../../theme/hooks/useAppDesignTokens";

export interface StepHeaderConfig {
  showStepIndicator?: boolean;
  currentStep?: number;
  totalSteps?: number;
  titleAlignment?: "left" | "center" | "right";
  titleFontSize?: number;
  subtitleFontSize?: number;
  spacing?: {
    marginBottom?: number;
    paddingHorizontal?: number;
  };
}

export interface StepHeaderProps {
  title: string;
  subtitle?: string;
  config?: StepHeaderConfig;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_CONFIG: StepHeaderConfig = {
  showStepIndicator: false,
  titleAlignment: "left",
  titleFontSize: 28,
  subtitleFontSize: 16,
  spacing: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
};

export const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  subtitle,
  config = DEFAULT_CONFIG,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const cfg = { ...DEFAULT_CONFIG, ...config };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          paddingHorizontal: cfg.spacing?.paddingHorizontal ?? 24,
          marginBottom: cfg.spacing?.marginBottom ?? 32,
        },
        stepIndicator: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 12,
        },
        stepDot: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 4,
        },
        activeDot: {
          backgroundColor: tokens.colors.primary,
        },
        inactiveDot: {
          backgroundColor: `${tokens.colors.primary}30`,
        },
        title: {
          fontSize: cfg.titleFontSize,
          fontWeight: "900",
          color: tokens.colors.textPrimary,
          textAlign: cfg.titleAlignment,
          marginBottom: subtitle ? 12 : 0,
          letterSpacing: 0.3,
        },
        subtitle: {
          fontSize: cfg.subtitleFontSize,
          fontWeight: "500",
          color: tokens.colors.textSecondary,
          textAlign: cfg.titleAlignment,
          lineHeight: (cfg.subtitleFontSize ?? 16) * 1.5,
          opacity: 0.9,
        },
      }),
    [tokens, cfg, subtitle],
  );

  return (
    <View style={[styles.container, style]}>
      {cfg.showStepIndicator &&
        cfg.currentStep !== undefined &&
        cfg.totalSteps !== undefined && (
          <View style={styles.stepIndicator}>
            {Array.from({ length: cfg.totalSteps }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.stepDot,
                  i + 1 <= cfg.currentStep!
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        )}

      <AtomicText style={styles.title}>{title}</AtomicText>

      {subtitle && <AtomicText style={styles.subtitle}>{subtitle}</AtomicText>}
    </View>
  );
};
