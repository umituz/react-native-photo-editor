import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface DraggableStickerProps {
  uri: string;
  initialX: number;
  initialY: number;
  rotation?: number;
  scale?: number;
  opacity?: number;
  onDragEnd: (x: number, y: number) => void;
  onPress: () => void;
  isSelected?: boolean;
}

export const DraggableSticker: React.FC<DraggableStickerProps> = ({
  uri,
  initialX,
  initialY,
  rotation = 0,
  scale = 1,
  opacity = 1,
  onDragEnd,
  onPress,
  isSelected,
}) => {
  const tokens = useAppDesignTokens();
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const offset = useSharedValue({ x: 0, y: 0 });

  const isEmoji = uri.length <= 4 && !uri.startsWith("http");

  const drag = Gesture.Pan()
    .minDistance(5)
    .onStart(() => {
      offset.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = offset.value.x + event.translationX;
      translateY.value = offset.value.y + event.translationY;
    })
    .onEnd(() => {
      runOnJS(onDragEnd)(translateX.value, translateY.value);
    });

  const tap = Gesture.Tap()
    .maxDistance(5)
    .onEnd(() => {
      runOnJS(onPress)();
    });

  const gesture = Gesture.Exclusive(drag, tap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation}deg` },
      { scale: scale },
    ],
    opacity: opacity,
    zIndex: isSelected ? 100 : 50,
  }));

  const styles = StyleSheet.create({
    container: { position: "absolute", left: 0, top: 0 },
    emojiContainer: {
      padding: 4,
      borderRadius: 8,
      borderWidth: isSelected ? 2 : 0,
      borderColor: tokens.colors.primary,
      borderStyle: "dashed",
      backgroundColor: isSelected
        ? tokens.colors.primary + "20"
        : "transparent",
    },
    emoji: { fontSize: 64 },
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.emojiContainer}>
          {isEmoji ? <AtomicText style={styles.emoji}>{uri}</AtomicText> : null}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};
