/**
 * Transform Gesture Utility
 * Reusable gesture logic for draggable layers
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { Gesture } from "react-native-gesture-handler";
import type { Layer } from "../../domain/entities/Layer.entity";

export interface TransformGestureState {
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export interface TransformGestureConfig {
  minScale?: number;
  maxScale?: number;
  onTransformEnd: (transform: { x: number; y: number; scale: number; rotation: number }) => void;
  onPress?: () => void;
}

export function useTransformGesture(
  initialTransform: Pick<Layer, "position" | "rotation" | "scale">,
  config: TransformGestureConfig
) {
  const {
    minScale = 0.2,
    maxScale = 6,
    onTransformEnd,
    onPress,
  } = config;

  const [state, setState] = useState<TransformGestureState>(() => ({
    position: { x: initialTransform.position.x, y: initialTransform.position.y },
    scale: initialTransform.scale,
    rotation: initialTransform.rotation,
  }));

  const stateRef = useRef(state);
  stateRef.current = state;

  const onTransformEndRef = useRef(onTransformEnd);
  onTransformEndRef.current = onTransformEnd;
  const onPressRef = useRef(onPress);
  onPressRef.current = onPress;

  const offsetRef = useRef(state.position);
  const scaleStartRef = useRef(state.scale);
  const rotationStartRef = useRef(state.rotation);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      position: {
        x: initialTransform.position.x ?? prev.position.x,
        y: initialTransform.position.y ?? prev.position.y,
      },
      scale: initialTransform.scale ?? prev.scale,
      rotation: initialTransform.rotation ?? prev.rotation,
    }));
  }, [initialTransform.position.x, initialTransform.position.y, initialTransform.scale, initialTransform.rotation]);

  const emitTransform = useCallback(() => {
    onTransformEndRef.current({
      x: stateRef.current.position.x,
      y: stateRef.current.position.y,
      scale: stateRef.current.scale,
      rotation: stateRef.current.rotation,
    });
  }, []);

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .averageTouches(true)
    .onStart(() => {
      offsetRef.current = stateRef.current.position;
    })
    .onUpdate((e: { translationX: number; translationY: number }) => {
      setState({
        ...stateRef.current,
        position: {
          x: offsetRef.current.x + e.translationX,
          y: offsetRef.current.y + e.translationY,
        },
      });
    })
    .onEnd(emitTransform);

  const pinchGesture = Gesture.Pinch()
    .runOnJS(true)
    .onStart(() => {
      scaleStartRef.current = stateRef.current.scale;
    })
    .onUpdate((e: { scale: number }) => {
      setState({
        ...stateRef.current,
        scale: Math.max(minScale, Math.min(maxScale, scaleStartRef.current * e.scale)),
      });
    })
    .onEnd(emitTransform);

  const rotationGesture = Gesture.Rotation()
    .runOnJS(true)
    .onStart(() => {
      rotationStartRef.current = stateRef.current.rotation;
    })
    .onUpdate((e: { rotation: number }) => {
      setState({
        ...stateRef.current,
        rotation: rotationStartRef.current + (e.rotation * 180) / Math.PI,
      });
    })
    .onEnd(emitTransform);

  const tapGesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(() => onPressRef.current?.());

  const composed = Gesture.Exclusive(
    Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture),
    tapGesture
  );

  return { state, gestures: { pan: panGesture, pinch: pinchGesture, rotation: rotationGesture, tap: tapGesture, composed } };
}

