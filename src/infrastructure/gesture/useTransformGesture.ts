/**
 * Transform Gesture Hook
 * Reusable gesture logic for draggable components
 * Eliminates ~180 lines of duplicate code
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { Gesture } from "react-native-gesture-handler";
import type { Transform } from "../../domain/entities/Transform";
import type { TransformGestureConfig, TransformGestureState } from "./types";

const DEFAULT_STATE: TransformGestureState = {
  position: { x: 50, y: 50 },
  scale: 1,
  rotation: 0,
};

export function useTransformGesture(
  initialTransform: Partial<Transform>,
  config: TransformGestureConfig
) {
  const {
    minScale = 0.2,
    maxScale = 6,
    onTransformEnd,
    onPress,
  } = config;

  // State
  const [state, setState] = useState<TransformGestureState>(() => ({
    position: { x: initialTransform.x ?? 50, y: initialTransform.y ?? 50 },
    scale: initialTransform.scale ?? 1,
    rotation: initialTransform.rotation ?? 0,
  }));

  // Sync state when props change (undo/redo)
  useEffect(() => {
    setState(prev => ({
      ...prev,
      position: { x: initialTransform.x ?? prev.position.x, y: initialTransform.y ?? prev.position.y },
      scale: initialTransform.scale ?? prev.scale,
      rotation: initialTransform.rotation ?? prev.rotation,
    }));
  }, [initialTransform.x, initialTransform.y, initialTransform.scale, initialTransform.rotation]);

  // Refs for gesture callbacks
  const stateRef = useRef(state);
  stateRef.current = state;
  const onTransformEndRef = useRef(onTransformEnd);
  onTransformEndRef.current = onTransformEnd;
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;

  // Start values for gestures
  const offsetRef = useRef(state.position);
  const scaleStartRef = useRef(state.scale);
  const rotationStartRef = useRef(state.rotation);

  // Emit transform
  const emitTransform = useCallback(() => {
    onTransformEndRef.current({
      x: stateRef.current.position.x,
      y: stateRef.current.position.y,
      scale: stateRef.current.scale,
      rotation: stateRef.current.rotation,
    });
  }, []);

  // Pan gesture
  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .averageTouches(true)
    .onStart(() => {
      offsetRef.current = stateRef.current.position;
    })
    .onUpdate((e) => {
      setState(prev => ({
        ...prev,
        position: {
          x: offsetRef.current.x + e.translationX,
          y: offsetRef.current.y + e.translationY,
        },
      }));
    })
    .onEnd(emitTransform);

  // Pinch gesture
  const pinchGesture = Gesture.Pinch()
    .runOnJS(true)
    .onStart(() => {
      scaleStartRef.current = stateRef.current.scale;
    })
    .onUpdate((e) => {
      setState(prev => ({
        ...prev,
        scale: Math.max(minScale, Math.min(maxScale, scaleStartRef.current * e.scale)),
      }));
    })
    .onEnd(emitTransform);

  // Rotation gesture
  const rotationGesture = Gesture.Rotation()
    .runOnJS(true)
    .onStart(() => {
      rotationStartRef.current = stateRef.current.rotation;
    })
    .onUpdate((e) => {
      setState(prev => ({
        ...prev,
        rotation: rotationStartRef.current + (e.rotation * 180) / Math.PI,
      }));
    })
    .onEnd(emitTransform);

  // Tap gesture
  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => onPressRef.current?.());

  // Composed gesture
  const composed = Gesture.Exclusive(
    Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture),
    tapGesture,
  );

  return {
    state,
    gestures: {
      pan: panGesture,
      pinch: pinchGesture,
      rotation: rotationGesture,
      tap: tapGesture,
      composed,
    },
  };
}
