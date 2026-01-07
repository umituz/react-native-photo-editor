import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { DraggableText } from "./DraggableText";
import { DraggableSticker } from "./DraggableSticker";
import { Layer, TextLayer, StickerLayer } from "../types";

interface EditorCanvasProps {
  imageUrl: string;
  layers: Layer[];
  activeLayerId: string | null;
  onLayerTap: (layerId: string) => void;
  onLayerMove: (layerId: string, x: number, y: number) => void;
  styles: {
    canvas: object;
    canvasImage: object;
  };
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  imageUrl,
  layers,
  activeLayerId,
  onLayerTap,
  onLayerMove,
  styles,
}) => {
  return (
    <View style={styles.canvas}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.canvasImage}
        contentFit="cover"
      />
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
              _strokeColor={textLayer.strokeColor}
              _strokeWidth={textLayer.strokeWidth}
              initialX={textLayer.x}
              initialY={textLayer.y}
              onDragEnd={(x, y) => onLayerMove(layer.id, x, y)}
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
              onDragEnd={(x, y) => onLayerMove(layer.id, x, y)}
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
