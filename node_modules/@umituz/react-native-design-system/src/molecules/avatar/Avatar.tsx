/**
 * Avatar Domain - Avatar Component
 *
 * Universal avatar component with image, initials, and icon support.
 * Handles loading states, fallbacks, and status indicators.
 */

import React from 'react';
import { View, Image, StyleSheet, type StyleProp, type ViewStyle, type ImageStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicText, AtomicIcon } from '../../atoms';
import type { AvatarSize, AvatarShape } from './Avatar.utils';
import {
  SIZE_CONFIGS,
  AvatarUtils,
  AVATAR_CONSTANTS,
} from './Avatar.utils';

/**
 * Avatar component props
 */
export interface AvatarProps {
  /** Image URI */
  uri?: string;
  /** User name for initials */
  name?: string;
  /** Icon name (fallback when no image/name) */
  icon?: string;
  /** Size preset */
  size?: AvatarSize;
  /** Shape */
  shape?: AvatarShape;
  /** Custom background color */
  backgroundColor?: string;
  /** Show status indicator */
  showStatus?: boolean;
  /** Status (online/offline/away/busy) */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom image style */
  imageStyle?: StyleProp<ImageStyle>;
  /** OnPress handler */
  onPress?: () => void;
}

/**
 * Avatar Component
 *
 * Displays user avatars with automatic fallback hierarchy:
 * 1. Image (if uri provided)
 * 2. Initials (if name provided)
 * 3. Icon (fallback)
 *
 * USAGE:
 * ```typescript
 * // Image avatar
 * <Avatar uri="https://..." name="Ümit Uz" size="lg" />
 *
 * // Initials avatar (no image)
 * <Avatar name="Ümit Uz" size="md" />
 *
 * // Icon avatar (fallback)
 * <Avatar size="sm" />
 *
 * // With status indicator
 * <Avatar
 *   name="Ümit Uz"
 *   showStatus
 *   status="online"
 * />
 *
 * // Custom shape
 * <Avatar name="John Doe" shape="rounded" />
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  icon = AVATAR_CONSTANTS.DEFAULT_ICON,
  size = AVATAR_CONSTANTS.DEFAULT_SIZE,
  shape = AVATAR_CONSTANTS.DEFAULT_SHAPE,
  backgroundColor,
  showStatus = false,
  status = 'offline',
  style,
  imageStyle,
  onPress,
}) => {
  const tokens = useAppDesignTokens();
  const config = SIZE_CONFIGS[size];

  // Determine avatar type and content
  const hasImage = !!uri;
  const hasName = !!name;
  const initials = hasName ? AvatarUtils.generateInitials(name) : AVATAR_CONSTANTS.FALLBACK_INITIALS;
  const bgColor = backgroundColor || (hasName ? AvatarUtils.getColorForName(name) : tokens.colors.surfaceSecondary);
  const borderRadius = AvatarUtils.getBorderRadius(shape, config.size);

  // Status indicator position
  const statusPosition = {
    bottom: 0,
    right: 0,
  };

  const renderContent = () => {
    if (hasImage) {
      return (
        <Image
          source={{ uri }}
          style={[
            styles.image,
            {
              width: config.size,
              height: config.size,
              borderRadius,
            },
            imageStyle,
          ]}
        />
      );
    }

    if (hasName) {
      return (
        <AtomicText
          type="bodyMedium"
          style={[
            styles.initials,
            {
              fontSize: config.fontSize,
              color: tokens.colors.textInverse,
            },
          ]}
        >
          {initials}
        </AtomicText>
      );
    }

    // Fallback to icon
    return (
      <AtomicIcon
        name={icon}
        customSize={config.iconSize}
        customColor={tokens.colors.textInverse}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: config.size,
          height: config.size,
          borderRadius,
          backgroundColor: bgColor,
        },
        style,
      ]}
      onTouchEnd={onPress}
    >
      {renderContent()}

      {/* Status Indicator */}
      {showStatus && (
        <View
          style={[
            styles.statusIndicator,
            {
              width: config.statusSize,
              height: config.statusSize,
              borderRadius: config.statusSize / 2,
              backgroundColor: AvatarUtils.getStatusColor(status),
              borderWidth: config.borderWidth,
              borderColor: tokens.colors.onBackground,
              ...statusPosition,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    fontWeight: '600',
    textAlign: 'center',
  },
  statusIndicator: {
    position: 'absolute',
  },
});

