/**
 * AtomicAvatar - Universal Avatar Component
 *
 * Displays user profile images with fallback to initials
 * Theme: {{THEME_NAME}} ({{CATEGORY}} category)
 *
 * Atomic Design Level: ATOM
 * Purpose: User profile image display
 *
 * Usage:
 * - User profile pictures
 * - Contact avatars
 * - Group member avatars
 * - Default user placeholders
 */

import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
import { AtomicText } from './AtomicText';
import { useAppDesignTokens } from '../theme';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AtomicAvatarProps {
  /** Image source (URI or require) */
  source?: ImageSourcePropType;
  /** User's name for fallback initials */
  name?: string;
  /** Size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /** Custom size in pixels */
  customSize?: number;
  /** Background color for fallback */
  backgroundColor?: string;
  /** Text color for initials */
  textColor?: string;
  /** Border radius (default: circular) */
  borderRadius?: number;
  /** Border width */
  borderWidth?: number;
  /** Border color */
  borderColor?: string;
  /** Style overrides */
  style?: ViewStyle | ViewStyle[];
  /** Image style overrides */
  imageStyle?: ImageStyle | ImageStyle[];
  /** Test ID for testing */
  testID?: string;
}

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

export const AtomicAvatar: React.FC<AtomicAvatarProps> = ({
  source,
  name,
  size = 'md',
  customSize,
  backgroundColor,
  textColor,
  borderRadius,
  borderWidth = 0,
  borderColor,
  style,
  imageStyle,
  testID,
}) => {
  const tokens = useAppDesignTokens();

  const avatarSize = customSize ? customSize * tokens.spacingMultiplier : tokens.avatarSizes[size];
  const avatarRadius = borderRadius ?? avatarSize / 2;

  // Generate initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Default colors
  const defaultBackgroundColor = backgroundColor || tokens.colors.primary;
  const defaultTextColor = textColor || tokens.colors.onPrimary;
  const defaultBorderColor = borderColor || tokens.colors.border;

  const avatarStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarRadius,
    backgroundColor: defaultBackgroundColor,
    borderWidth,
    borderColor: defaultBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const imageStyleFinal: ImageStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarRadius,
  };

  // Font size based on avatar size (scaled)
  const getAvatarFontSize = (sizeValue: number): number => {
    const baseFontSize = sizeValue <= 32 ? 12 : 
                        sizeValue <= 48 ? 16 : 
                        sizeValue <= 64 ? 20 : 24;
    return baseFontSize * tokens.spacingMultiplier;
  };

  return (
    <View
      style={[avatarStyle, style]}
      testID={testID}
      accessibilityLabel={name ? `Avatar for ${name}` : 'Default avatar'}
      accessibilityRole="image"
    >
      {source ? (
        <Image
          source={source}
          style={StyleSheet.flatten([imageStyleFinal, imageStyle])}
          resizeMode="cover"
        />
      ) : name ? (
        <AtomicText
          type="labelLarge"
          color={defaultTextColor}
          style={{
            fontSize: getAvatarFontSize(avatarSize),
            fontWeight: tokens.typography.semibold,
          }}
        >
          {getInitials(name)}
        </AtomicText>
      ) : (
        <AtomicText
          type="labelLarge"
          color={defaultTextColor}
          style={{
            fontSize: getAvatarFontSize(avatarSize),
            fontWeight: tokens.typography.semibold,
          }}
        >
          ?
        </AtomicText>
      )}
    </View>
  );
};

// =============================================================================
// EXPORTS
// =============================================================================

export default AtomicAvatar;
