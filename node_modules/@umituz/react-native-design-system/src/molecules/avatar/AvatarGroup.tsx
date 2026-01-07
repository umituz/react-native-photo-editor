/**
 * Avatar Domain - AvatarGroup Component
 *
 * Displays multiple avatars in a stacked layout.
 * Shows overflow count when exceeding max visible avatars.
 */

import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../theme';
import { AtomicText } from '../../atoms';
import { Avatar } from './Avatar';
import type { AvatarSize, AvatarShape } from './Avatar.utils';
import {
  SIZE_CONFIGS,
  AVATAR_CONSTANTS,
} from './Avatar.utils';

/**
 * Avatar item for group
 */
export interface AvatarGroupItem {
  uri?: string;
  name?: string;
  icon?: string;
}

/**
 * AvatarGroup component props
 */
export interface AvatarGroupProps {
  /** Array of avatar items */
  items: AvatarGroupItem[];
  /** Maximum visible avatars */
  maxVisible?: number;
  /** Avatar size */
  size?: AvatarSize;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Spacing between avatars (negative for overlap) */
  spacing?: number;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * AvatarGroup Component
 *
 * Displays multiple avatars in a horizontal stack.
 * Shows "+N" indicator when exceeding max visible count.
 *
 * USAGE:
 * ```typescript
 * const users = [
 *   { name: 'Ümit Uz', uri: 'https://...' },
 *   { name: 'John Doe', uri: 'https://...' },
 *   { name: 'Jane Smith' },
 *   { name: 'Bob Johnson' },
 *   { name: 'Alice Brown' },
 * ];
 *
 * // Show 3 avatars + overflow
 * <AvatarGroup items={users} maxVisible={3} />
 *
 * // Custom spacing
 * <AvatarGroup items={users} spacing={-12} />
 *
 * // Different size
 * <AvatarGroup items={users} size="lg" />
 * ```
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  items,
  maxVisible = AVATAR_CONSTANTS.MAX_GROUP_VISIBLE,
  size = AVATAR_CONSTANTS.DEFAULT_SIZE,
  shape = AVATAR_CONSTANTS.DEFAULT_SHAPE,
  spacing = AVATAR_CONSTANTS.GROUP_SPACING,
  style,
}) => {
  const tokens = useAppDesignTokens();
  const config = SIZE_CONFIGS[size];

  // Calculate visible avatars and overflow count
  const visibleItems = items.slice(0, maxVisible);
  const overflowCount = items.length - maxVisible;
  const hasOverflow = overflowCount > 0;

  return (
    <View style={[styles.container, style]}>
      {/* Render visible avatars */}
      {visibleItems.map((item, index) => (
        <View
          key={index}
          style={[
            styles.avatarWrapper,
            index > 0 && { marginLeft: spacing },
          ]}
        >
          <Avatar
            uri={item.uri}
            name={item.name}
            icon={item.icon}
            size={size}
            shape={shape}
            style={[
              styles.avatar,
              {
                borderWidth: 2,
                borderColor: tokens.colors.onBackground,
              },
            ]}
          />
        </View>
      ))}

      {/* Overflow indicator */}
      {hasOverflow && (
        <View
          style={[
            styles.avatarWrapper,
            { marginLeft: spacing },
          ]}
        >
          <View
            style={[
              styles.overflow,
              {
                width: config.size,
                height: config.size,
                borderRadius: shape === 'circle' ? config.size / 2 : shape === 'rounded' ? 8 : 0,
                backgroundColor: tokens.colors.surfaceSecondary,
                borderWidth: 2,
                borderColor: tokens.colors.onBackground,
              },
            ]}
          >
            <AtomicText
              type="bodySmall"
              style={[
                styles.overflowText,
                {
                  fontSize: config.fontSize,
                  color: tokens.colors.textSecondary,
                },
              ]}
            >
              +{overflowCount}
            </AtomicText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    // Wrapper for easier spacing control
  },
  avatar: {
    // Avatar styles
  },
  overflow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowText: {
    fontWeight: '600',
  },
});

