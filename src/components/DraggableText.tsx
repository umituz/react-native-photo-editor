import React, { useMemo } from "react";
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
import { TextAlign } from "../types";

interface DraggableTextProps {
  text: string;
  color: string;
  fontSize?: number;
  fontFamily?: string;
  textAlign?: TextAlign;
  rotation?: number;
  scale?: number;
  opacity?: number;
  backgroundColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  initialX: number;
  initialY: number;
  onDragEnd: (x: number, y: number) => void;
  onPress: () => void;
  isSelected?: boolean;
}

export const DraggableText: React.FC<DraggableTextProps> = ({
  text,
  color,
  fontSize = 24,
  fontFamily = "System",
  textAlign = "center",
  rotation = 0,
  scale = 1,
  opacity = 1,
  backgroundColor = "transparent",
  strokeColor,
  strokeWidth = 2,
  initialX,
  initialY,
  onDragEnd,
  onPress,
  isSelected,
}) => {
  const tokens = useAppDesignTokens();
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const offset = useSharedValue({ x: 0, y: 0 });

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation}deg` },
        { scale: scale },
      ],
      opacity: opacity,
      zIndex: isSelected ? 100 : 10,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          { position: "absolute", left: 0, top: 0 },
        ]}
      >
        <View
          style={[
            {
              backgroundColor: backgroundColor,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            },
            isSelected && {
              borderWidth: 2,
              borderColor: tokens.colors.primary,
              borderStyle: "dashed",
              backgroundColor:
                backgroundColor === "transparent"
                  ? `${tokens.colors.primary}10`
                  : backgroundColor,
            },
          ]}
        >
          <AtomicText
            style={{
              fontSize: fontSize,
              fontFamily: fontFamily,
              fontWeight: "900",
              textAlign: textAlign,
              textTransform: "uppercase",
              color: color,
              minWidth: text ? undefined : 100,
              minHeight: text ? undefined : 40,
            }}
          >
            {text}
          </AtomicText>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
});
