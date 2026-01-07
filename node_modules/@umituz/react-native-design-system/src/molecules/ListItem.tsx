import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicText, AtomicIcon } from '../atoms';
import { ListItemProps } from './listitem/types';
import { getListItemStyles } from './listitem/styles/listItemStyles';

export type { ListItemProps };

export const ListItem: React.FC<ListItemProps> = ({
  title, subtitle, leftIcon, rightIcon, onPress, disabled = false, style,
}) => {
  const tokens = useAppDesignTokens();
  const listItemStyles = getListItemStyles(tokens);
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={[listItemStyles.container, disabled ? listItemStyles.disabled : undefined, style]} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      {leftIcon && (
        <View style={listItemStyles.iconContainer}>
          <AtomicIcon name={leftIcon} color={disabled ? 'surfaceVariant' : 'primary'} size="md" />
        </View>
      )}
      <View style={listItemStyles.content}>
        <AtomicText type="bodyLarge" color={disabled ? 'surfaceVariant' : 'onSurface'} numberOfLines={1}>{title}</AtomicText>
        {subtitle && <AtomicText type="bodySmall" color="surfaceVariant" numberOfLines={2} style={listItemStyles.subtitle}>{subtitle}</AtomicText>}
      </View>
      {rightIcon && onPress && (
        <View style={listItemStyles.iconContainer}>
          <AtomicIcon name={rightIcon} color="surfaceVariant" size="sm" />
        </View>
      )}
    </Component>
  );
};
