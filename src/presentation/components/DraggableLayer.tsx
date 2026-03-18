/**
 * Draggable Layer Component
 * Unified draggable component for both text and stickers
 * Replaces DraggableText + DraggableSticker (~180 lines of duplicate code)
 */

import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { useTransformGesture } from "../../infrastructure/gesture/useTransformGesture";
import { Layer, isTextLayer, isStickerLayer } from "../../domain/entities/Layer";

interface DraggableLayerProps {
  layer: Layer;
  isSelected: boolean;
  onPress: () => void;
  onTransformEnd: (transform: { x: number; y: number; scale: number; rotation: number }) => void;
}

const isEmojiString = (str: string) =>
  str.length <= 4 && !/^https?:\/\//i.test(str) && !str.startsWith("/");

export const DraggableLayer = memo<DraggableLayerProps>(({
  layer,
  isSelected,
  onPress,
  onTransformEnd,
}) => {
  const tokens = useAppDesignTokens();
  const { state, gestures } = useTransformGesture(layer, {
    onTransformEnd,
    onPress,
  });

  return (
    <GestureDetector gesture={gestures.composed}>
      <View
        accessibilityLabel={isTextLayer(layer) ? layer.text || "Text layer" : "Sticker layer"}
        accessibilityRole="button"
        style={[
          styles.container,
          {
            transform: [
              { translateX: state.position.x },
              { translateY: state.position.y },
              { rotate: `${state.rotation}deg` },
              { scale: state.scale },
            ],
            opacity: layer.opacity,
            zIndex: isSelected ? 100 : layer.zIndex,
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
              : isTextLayer(layer)
                ? layer.backgroundColor
                : "transparent",
          }}
        >
          {isTextLayer(layer) ? (
            <AtomicText
              style={{
                fontSize: layer.fontSize,
                fontFamily: layer.fontFamily === "System" ? undefined : layer.fontFamily,
                color: layer.color,
                textAlign: layer.textAlign,
                fontWeight: layer.isBold ? "900" : "normal",
                fontStyle: layer.isItalic ? "italic" : "normal",
              }}
            >
              {layer.text || "TAP TO EDIT"}
            </AtomicText>
          ) : isStickerLayer(layer) ? (
            renderStickerContent(layer.uri, tokens)
          ) : null}
        </View>
      </View>
    </GestureDetector>
  );
});

DraggableLayer.displayName = "DraggableLayer";

function renderStickerContent(uri: string, tokens: any) {
  const isEmoji = isEmojiString(uri);

  if (isEmoji) {
    return <AtomicText style={{ fontSize: 48 }}>{uri}</AtomicText>;
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: 80, height: 80 }}
      contentFit="contain"
      accessibilityIgnoresInvertColors
    />
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute" },
});
