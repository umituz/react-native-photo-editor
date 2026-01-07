/**
 * AtomicCard Component
 *
 * A simple, styled card container component
 */

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
  type GestureResponderEvent,
} from 'react-native';
import { useAppDesignTokens } from '../theme';

export type AtomicCardVariant = 'elevated' | 'outlined' | 'filled';
export type AtomicCardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface AtomicCardProps {
  children: React.ReactNode;
  variant?: AtomicCardVariant;
  padding?: AtomicCardPadding;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export const AtomicCard: React.FC<AtomicCardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  style,
  testID,
  onPress,
  disabled,
}) => {
    const tokens = useAppDesignTokens();

    const paddingValues: Record<AtomicCardPadding, number> = {
        none: 0,
        sm: tokens.spacing.sm,
        md: tokens.spacing.md,
        lg: tokens.spacing.lg,
    };

    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'elevated':
                return {
                    backgroundColor: tokens.colors.surface,
                    borderWidth: 1,
                    borderColor: tokens.colors.outlineVariant || tokens.colors.outline,
                };
            case 'outlined':
                return {
                    backgroundColor: tokens.colors.surface,
                    borderWidth: 1,
                    borderColor: tokens.colors.outline,
                };
            case 'filled':
                return {
                    backgroundColor: tokens.colors.surfaceVariant,
                };
            default:
                return {};
        }
    };

  const cardStyle = [
    styles.card,
    { borderRadius: tokens.borders.radius.md },
    { padding: paddingValues[padding] },
    getVariantStyle(),
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        style={cardStyle}
        testID={testID}
        onPress={onPress}
        disabled={disabled}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
