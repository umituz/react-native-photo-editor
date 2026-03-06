import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

export interface LayerTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface DraggableTextProps {
  text: string;
  color: string;
  fontSize?: number;
  fontFamily?: string;
  initialX: number;
  initialY: number;
  rotation?: number;
  scale?: number;
  opacity?: number;
  textAlign?: "center" | "left" | "right";
  backgroundColor?: string;
  isBold?: boolean;
  isItalic?: boolean;
  onTransformEnd: (transform: LayerTransform) => void;
  onPress: () => void;
  isSelected?: boolean;
}

export const DraggableText: React.FC<DraggableTextProps> = ({
  text,
  color,
  fontSize = 24,
  fontFamily = "System",
  initialX,
  initialY,
  rotation: rotationProp = 0,
  scale: scaleProp = 1,
  opacity = 1,
  textAlign = "center",
  backgroundColor = "transparent",
  isBold = false,
  isItalic = false,
  onTransformEnd,
  onPress,
  isSelected,
}) => {
  const tokens = useAppDesignTokens();
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [scale, setScale] = useState(scaleProp);
  const [rotation, setRotation] = useState(rotationProp); // degrees

  // Sync when props change (e.g., undo/redo)
  useEffect(() => { setPosition({ x: initialX, y: initialY }); }, [initialX, initialY]);
  useEffect(() => { setScale(scaleProp); }, [scaleProp]);
  useEffect(() => { setRotation(rotationProp); }, [rotationProp]);

  // Refs for gesture callbacks to avoid stale closures
  const positionRef = useRef(position);
  positionRef.current = position;
  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const rotationRef = useRef(rotation);
  rotationRef.current = rotation;
  const onTransformEndRef = useRef(onTransformEnd);
  onTransformEndRef.current = onTransformEnd;
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;

  // Start-of-gesture saved values
  const offsetRef = useRef({ x: initialX, y: initialY });
  const scaleStartRef = useRef(scale);
  const rotationStartRef = useRef(rotation); // degrees

  const emitTransform = useCallback(() => {
    onTransformEndRef.current({
      x: positionRef.current.x,
      y: positionRef.current.y,
      scale: scaleRef.current,
      rotation: rotationRef.current,
    });
  }, []);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .averageTouches(true)
    .onStart(() => {
      offsetRef.current = { x: positionRef.current.x, y: positionRef.current.y };
    })
    .onUpdate((e) => {
      setPosition({
        x: offsetRef.current.x + e.translationX,
        y: offsetRef.current.y + e.translationY,
      });
    })
    .onEnd(emitTransform);

  const pinchGesture = Gesture.Pinch()
    .runOnJS(true)
    .onStart(() => {
      scaleStartRef.current = scaleRef.current;
    })
    .onUpdate((e) => {
      setScale(Math.max(0.2, Math.min(6, scaleStartRef.current * e.scale)));
    })
    .onEnd(emitTransform);

  const rotationGesture = Gesture.Rotation()
    .runOnJS(true)
    .onStart(() => {
      rotationStartRef.current = rotationRef.current;
    })
    .onUpdate((e) => {
      setRotation(rotationStartRef.current + (e.rotation * 180) / Math.PI);
    })
    .onEnd(emitTransform);

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => onPressRef.current());

  const composed = Gesture.Exclusive(
    Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture),
    tapGesture,
  );

  return (
    <GestureDetector gesture={composed}>
      <View
        accessibilityLabel={text || "Text layer"}
        accessibilityRole="button"
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
            backgroundColor: isSelected
              ? tokens.colors.primary + "10"
              : backgroundColor,
          }}
        >
          <AtomicText
            style={{
              fontSize,
              fontFamily: fontFamily === "System" ? undefined : fontFamily,
              color,
              textAlign,
              fontWeight: isBold ? "900" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
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
  container: { position: "absolute" },
});
