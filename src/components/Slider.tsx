import React, { useRef, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (val: number) => void;
  formatValue?: (val: number) => string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 0.05,
  onValueChange,
  formatValue,
}) => {
  const tokens = useAppDesignTokens();
  const [trackWidth, setTrackWidth] = useState(200);
  const trackWidthRef = useRef(200);
  const startValueRef = useRef(value);
  const valueRef = useRef(value);
  valueRef.current = value;

  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  const snap = (v: number) => parseFloat((Math.round(v / step) * step).toFixed(4));

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onStart(() => {
      startValueRef.current = valueRef.current;
    })
    .onUpdate((e) => {
      const ratio = e.translationX / trackWidthRef.current;
      const delta = ratio * (max - min);
      onValueChange(snap(clamp(startValueRef.current + delta)));
    });

  const percent = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const thumbOffset = percent * trackWidth - 12;
  const displayValue = formatValue ? formatValue(value) : value.toFixed(1);

  return (
    <View style={{ gap: tokens.spacing.xs }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AtomicText type="labelMedium" color="textSecondary">
          {label}
        </AtomicText>
        <AtomicText type="labelMedium" color="primary" fontWeight="bold">
          {displayValue}
        </AtomicText>
      </View>
      <GestureDetector gesture={panGesture}>
        <View
          style={{ height: 44, justifyContent: "center", paddingHorizontal: 12 }}
          onLayout={(e) => {
            const w = Math.max(1, e.nativeEvent.layout.width - 24);
            setTrackWidth(w);
            trackWidthRef.current = w;
          }}
        >
          {/* Track background */}
          <View
            style={{
              height: 4,
              backgroundColor: tokens.colors.surfaceVariant,
              borderRadius: 2,
            }}
          >
            {/* Filled portion */}
            <View
              style={{
                width: `${percent * 100}%`,
                height: "100%",
                backgroundColor: tokens.colors.primary,
                borderRadius: 2,
              }}
            />
          </View>
          {/* Thumb */}
          <View
            style={{
              position: "absolute",
              left: thumbOffset + 12,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: tokens.colors.primary,
              borderWidth: 2.5,
              borderColor: tokens.colors.surface,
              top: 10,
            }}
          />
        </View>
      </GestureDetector>
    </View>
  );
};
