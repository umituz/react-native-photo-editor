import React, { forwardRef, useCallback, useMemo, useImperativeHandle, useState } from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { useSafeAreaInsets } from '../../../safe-area';
import { getResponsiveBottomSheetLayout } from '../../../responsive';
import type {
  BottomSheetRef,
  BottomSheetProps,
} from '../types/BottomSheet';

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>((props, ref) => {
  const {
    children,
    preset = 'medium',
    snapPoints: customSnapPoints,
    initialIndex,
    backgroundColor,
    onChange,
    onClose,
  } = props;

  const [visible, setVisible] = useState(initialIndex !== undefined && initialIndex >= 0);
  const tokens = useAppDesignTokens();
  const insets = useSafeAreaInsets();
  const { maxHeight, borderRadius } = getResponsiveBottomSheetLayout();

  const sheetHeight = useMemo(() => {
    if (customSnapPoints && customSnapPoints.length > 0) {
      const highest = customSnapPoints[customSnapPoints.length - 1];
      if (typeof highest === 'number') return highest;
      if (typeof highest === 'string' && highest.endsWith('%')) {
        return (maxHeight * parseFloat(highest)) / 100;
      }
    }
    
    const PRESET_HEIGHTS = {
      small: maxHeight * 0.35,
      medium: maxHeight * 0.6,
      large: maxHeight * 0.85,
      full: maxHeight,
      custom: maxHeight * 0.6,
    };
    return PRESET_HEIGHTS[preset] || PRESET_HEIGHTS.medium;
  }, [preset, customSnapPoints, maxHeight]);

  const present = useCallback(() => {
    setVisible(true);
    onChange?.(0);
  }, [onChange]);

  const dismiss = useCallback(() => {
    setVisible(false);
    onClose?.();
    onChange?.(-1);
  }, [onClose, onChange]);

  useImperativeHandle(ref, () => ({
    snapToIndex: (index: number) => {
      if (index >= 0) present();
      else dismiss();
    },
    snapToPosition: () => present(),
    expand: () => present(),
    collapse: () => dismiss(),
    close: () => dismiss(),
  }));

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: tokens.colors.modalOverlay,
      justifyContent: 'flex-end',
    },
    container: {
      height: sheetHeight,
      backgroundColor: backgroundColor || tokens.colors.surface,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      paddingBottom: Math.max(insets.bottom, 8),
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: tokens.colors.border,
      borderRadius: 2,
      alignSelf: 'center',
      marginTop: 12,
      marginBottom: 8,
    },
    content: {
      flex: 1,
    }
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={dismiss}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={dismiss}>
        <View style={styles.container}>
          <Pressable onPress={(e) => e.stopPropagation()} style={styles.content}>
            <View style={styles.handle} />
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
});

BottomSheet.displayName = 'BottomSheet';
