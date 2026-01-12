import React from "react";
import { View } from "react-native";
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
  onDragEnd: (x: number, y: number) => void;
  onPress: () => void;
  isSelected?: boolean;
  rotation?: number;
  scale?: number;
  opacity?: number;
}

export const DraggableSticker: React.FC<DraggableStickerProps> = ({
  uri,
  initialX,
  initialY,
  onDragEnd,
  onPress,
  isSelected,
  rotation = 0,
  scale = 1,
  opacity = 1,
}) => {
  const tokens = useAppDesignTokens();
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const offset = useSharedValue({ x: initialX, y: initialY });

  const panGesture = Gesture.Pan()
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

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(onPress)();
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation}deg` },
      { scale },
    ],
    opacity,
    zIndex: isSelected ? 100 : 50,
  }));

  const isEmoji = uri.length <= 4 && !uri.startsWith("http");

  return (
    <GestureDetector gesture={Gesture.Exclusive(panGesture, tapGesture)}>
      <Animated.View style={[animatedStyle, { position: "absolute" }]}>
        <View
          style={{
            padding: tokens.spacing.xs,
            borderRadius: tokens.borders.radius.sm,
            borderWidth: isSelected ? 2 : 0,
            borderColor: tokens.colors.primary,
            borderStyle: "dashed",
            backgroundColor: isSelected ? tokens.colors.primary + "10" : "transparent",
          }}
        >
          {isEmoji ? (
            <AtomicText style={{ fontSize: 48 }}>{uri}</AtomicText>
          ) : null}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};
