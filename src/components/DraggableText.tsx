import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface DraggableTextProps {
  text: string;
  color: string;
  fontSize?: number;
  fontFamily?: string;
  initialX: number;
  initialY: number;
  onDragEnd: (x: number, y: number) => void;
  onPress: () => void;
  isSelected?: boolean;
  rotation?: number;
  scale?: number;
  opacity?: number;
  textAlign?: "center" | "left" | "right";
  backgroundColor?: string;
  _strokeColor?: string;
  _strokeWidth?: number;
}

export const DraggableText: React.FC<DraggableTextProps> = ({
  text,
  color,
  fontSize = 24,
  fontFamily = "System",
  initialX,
  initialY,
  onDragEnd,
  onPress,
  isSelected,
  rotation = 0,
  scale = 1,
  opacity = 1,
  textAlign = "center",
  backgroundColor = "transparent",
}) => {
  const tokens = useAppDesignTokens();
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const offsetRef = useRef({ x: initialX, y: initialY });

  const handleDragEnd = useCallback(() => {
    onDragEnd(position.x, position.y);
  }, [position.x, position.y, onDragEnd]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offsetRef.current = { x: position.x, y: position.y };
    })
    .onUpdate((event) => {
      setPosition({
        x: offsetRef.current.x + event.translationX,
        y: offsetRef.current.y + event.translationY,
      });
    })
    .onEnd(() => {
      handleDragEnd();
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    onPress();
  });

  return (
    <GestureDetector gesture={Gesture.Exclusive(panGesture, tapGesture)}>
      <View
        style={[
          styles.container,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: `${rotation}deg` },
              { scale },
            ],
            opacity,
            zIndex: isSelected ? 100 : 10,
          },
        ]}
      >
        <View
          style={{
            padding: tokens.spacing.xs,
            borderRadius: tokens.borders.radius.sm,
            borderWidth: isSelected ? 2 : 0,
            borderColor: tokens.colors.primary,
            borderStyle: "dashed",
            backgroundColor: isSelected ? tokens.colors.primary + "10" : backgroundColor,
          }}
        >
          <AtomicText
            fontWeight="900"
            style={{
              fontSize,
              fontFamily,
              color,
              textAlign,
            }}
          >
            {text || "TAP TO EDIT"}
          </AtomicText>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
