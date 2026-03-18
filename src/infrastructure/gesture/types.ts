/**
 * Gesture Types
 * Shared types for transform gestures
 */

import type { Transform } from "../../domain/entities/Transform";

export interface TransformGestureState {
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export interface TransformGestureConfig {
  minScale?: number;
  maxScale?: number;
  onTransformEnd: (transform: Transform) => void;
  onPress?: () => void;
}

export interface TransformGestureHandlers {
  panGesture: ReturnType<typeof import("react-native-gesture-handler").Gesture.Pan>;
  pinchGesture: ReturnType<typeof import("react-native-gesture-handler").Gesture.Pinch>;
  rotationGesture: ReturnType<typeof import("react-native-gesture-handler").Gesture.Rotation>;
  tapGesture: ReturnType<typeof import("react-native-gesture-handler").Gesture.Tap>;
  composed: ReturnType<typeof import("react-native-gesture-handler").Gesture.Exclusive>;
}
