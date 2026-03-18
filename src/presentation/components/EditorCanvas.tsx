/**
 * Editor Canvas Component
 * Renders the image and all layers
 */

import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { DraggableLayer } from "./DraggableLayer";
import { Layer } from "../../domain/entities/Layer";
import type { FilterValues } from "../../domain/entities/Filters";

interface EditorCanvasProps {
  imageUrl: string;
  layers: Layer[];
  activeLayerId: string | null;
  filters: FilterValues;
  onLayerTap: (layerId: string) => void;
  onLayerTransform: (layerId: string, transform: { x: number; y: number; scale: number; rotation: number }) => void;
  style?: any;
}

export const EditorCanvas = memo<EditorCanvasProps>(({
  imageUrl,
  layers,
  activeLayerId,
  filters,
  onLayerTap,
  onLayerTransform,
  style,
}) => {
  const brightnessOverlay = createBrightnessOverlay(filters.brightness);

  return (
    <View style={[styles.canvas, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.canvasImage}
        contentFit="cover"
      />

      {brightnessOverlay && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: brightnessOverlay.color,
              opacity: brightnessOverlay.opacity,
            },
          ]}
          pointerEvents="none"
        />
      )}

      {layers.map((layer) => (
        <DraggableLayer
          key={layer.id}
          layer={layer}
          isSelected={activeLayerId === layer.id}
          onPress={() => onLayerTap(layer.id)}
          onTransformEnd={(transform) => onLayerTransform(layer.id, transform)}
        />
      ))}
    </View>
  );
});

EditorCanvas.displayName = "EditorCanvas";

function createBrightnessOverlay(brightness: number = 1) {
  if (brightness < 1) {
    return { color: "black", opacity: Math.min(0.6, 1 - brightness) };
  }
  if (brightness > 1) {
    return { color: "white", opacity: Math.min(0.4, brightness - 1) };
  }
  return null;
}

const styles = StyleSheet.create({
  canvas: {
    position: "relative",
    width: "100%",
    aspectRatio: 1,
  },
  canvasImage: {
    width: "100%",
    height: "100%",
  },
});
