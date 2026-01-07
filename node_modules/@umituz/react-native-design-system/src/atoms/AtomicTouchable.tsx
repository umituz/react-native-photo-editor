/**
 * AtomicTouchable - Touchable Component
 *
 * Atomic Design Level: ATOM
 * Purpose: Touchable wrapper across all apps
 */

import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';

export interface AtomicTouchableProps {
  children: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const AtomicTouchable: React.FC<AtomicTouchableProps> = ({
  children,
  onPress,
  onLongPress,
  disabled = false,
  activeOpacity = 0.7,
  style,
  testID,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={style}
      testID={testID}
    >
      {children}
    </TouchableOpacity>
  );
};
