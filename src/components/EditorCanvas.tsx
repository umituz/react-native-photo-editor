import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { DraggableText, LayerTransform } from "./DraggableText";
import { DraggableSticker } from "./DraggableSticker";
import { Layer, TextLayer, StickerLayer, ImageFilters } from "../types";

interface EditorCanvasProps {
  imageUrl: string;
  layers: Layer[];
  activeLayerId: string | null;
  filters: ImageFilters;
  onLayerTap: (layerId: string) => void;
  onLayerTransform: (layerId: string, transform: LayerTransform) => void;
  styles: {
    canvas: object;
    canvasImage: object;
  };
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  imageUrl,
  layers,
  activeLayerId,
  filters,
  onLayerTap,
  onLayerTransform,
  styles: externalStyles,
}) => {
  // Basic brightness preview: dark overlay for < 1, light for > 1
  const brightness = filters.brightness ?? 1;
  const brightnessOverlay =
    brightness < 1
      ? { color: "black", opacity: Math.min(0.6, 1 - brightness) }
      : brightness > 1
        ? { color: "white", opacity: Math.min(0.4, brightness - 1) }
        : null;

  return (
    <View style={externalStyles.canvas}>
      <Image
        source={{ uri: imageUrl }}
        style={externalStyles.canvasImage}
        contentFit="cover"
      />

      {/* Brightness visual overlay */}
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

      {layers.map((layer) => {
        if (layer.type === "text") {
          const textLayer = layer as TextLayer;
          return (
            <DraggableText
              key={layer.id}
              text={textLayer.text || "Tap to edit"}
              color={textLayer.color}
              fontSize={textLayer.fontSize}
              fontFamily={textLayer.fontFamily}
              textAlign={textLayer.textAlign}
              rotation={textLayer.rotation}
              scale={textLayer.scale}
              opacity={textLayer.opacity}
              backgroundColor={textLayer.backgroundColor}
              isBold={textLayer.isBold}
              isItalic={textLayer.isItalic}
              initialX={textLayer.x}
              initialY={textLayer.y}
              onTransformEnd={(t) => onLayerTransform(layer.id, t)}
              onPress={() => onLayerTap(layer.id)}
              isSelected={activeLayerId === layer.id}
            />
          );
        } else if (layer.type === "sticker") {
          const stickerLayer = layer as StickerLayer;
          return (
            <DraggableSticker
              key={layer.id}
              uri={stickerLayer.uri}
              initialX={stickerLayer.x}
              initialY={stickerLayer.y}
              rotation={stickerLayer.rotation}
              scale={stickerLayer.scale}
              opacity={stickerLayer.opacity}
              onTransformEnd={(t) => onLayerTransform(layer.id, t)}
              onPress={() => onLayerTap(layer.id)}
              isSelected={activeLayerId === layer.id}
            />
          );
        }
        return null;
      })}
    </View>
  );
};

export default React.memo(EditorCanvas);
