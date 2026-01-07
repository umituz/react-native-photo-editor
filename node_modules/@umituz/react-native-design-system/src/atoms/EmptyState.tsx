/**
 * EmptyState - Universal Empty State Component
 *
 * Displays when no data is available
 *
 * Atomic Design Level: ATOM
 * Purpose: Empty state indication across all apps
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AtomicIcon } from './AtomicIcon';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens, STATIC_TOKENS } from '../theme';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  illustration?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'file-tray-outline',
  title,
  subtitle,
  description,
  actionLabel,
  onAction,
  illustration,
  style,
  testID,
}) => {
  const tokens = useAppDesignTokens();
  const displayDescription = description || subtitle;

  return (
    <View style={[styles.container, style]} testID={testID}>
      {illustration ? (
        illustration
      ) : (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: tokens.colors.surface },
          ]}
        >
          <AtomicIcon name={icon} size="xxl" color="secondary" />
        </View>
      )}

      <AtomicText
        type="headlineSmall"
        color="primary"
        style={[styles.title, { textAlign: 'center' }]}
      >
        {title}
      </AtomicText>

      {displayDescription && (
        <AtomicText
          type="bodyMedium"
          color="secondary"
          style={[styles.description, { textAlign: 'center' }]}
        >
          {displayDescription}
        </AtomicText>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: tokens.colors.primary },
          ]}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <AtomicText type="labelLarge" color="onPrimary">
            {actionLabel}
          </AtomicText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: STATIC_TOKENS.spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: STATIC_TOKENS.spacing.lg,
  },
  title: {
    marginBottom: STATIC_TOKENS.spacing.sm,
  },
  description: {
    marginBottom: STATIC_TOKENS.spacing.lg,
    maxWidth: 280,
  },
  actionButton: {
    paddingHorizontal: STATIC_TOKENS.spacing.lg,
    paddingVertical: STATIC_TOKENS.spacing.md,
    borderRadius: STATIC_TOKENS.borders.radius.md,
    marginTop: STATIC_TOKENS.spacing.sm,
  },
});
