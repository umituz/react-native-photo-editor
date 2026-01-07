/**
 * BaseModal Component
 * Generic fullscreen modal with responsive design
 * Used across all modals in the app for consistency
 */

import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { useResponsive } from '../responsive';

export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissOnBackdrop?: boolean;
  contentStyle?: ViewStyle;
  testID?: string;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  dismissOnBackdrop = true,
  contentStyle,
  testID = 'base-modal',
}) => {
  const tokens = useAppDesignTokens();
  const { modalLayout } = useResponsive();

  const handleBackdropPress = React.useCallback(() => {
    if (dismissOnBackdrop) {
      onClose();
    }
  }, [dismissOnBackdrop, onClose]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      testID={testID}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={[
            styles.backdrop,
            { backgroundColor: `rgba(0, 0, 0, ${modalLayout.backdropOpacity})` }
          ]}
          activeOpacity={1}
          onPress={handleBackdropPress}
          testID={`${testID}-backdrop`}
        />

        <View
          style={[
            styles.content,
            {
              width: modalLayout.width,
              height: modalLayout.height,
              borderRadius: modalLayout.borderRadius,
              backgroundColor: tokens.colors.backgroundPrimary,
              borderColor: tokens.colors.border,
            },
            contentStyle,
          ]}
          testID={`${testID}-content`}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    overflow: 'hidden',
    borderWidth: 1,
  },
});
