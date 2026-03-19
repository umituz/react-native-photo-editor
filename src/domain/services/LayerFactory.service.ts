/**
 * Layer Factory Service
 * Centralized layer creation with defaults and validation
 */

import { TextLayer } from "../entities/TextLayer.entity";
import { StickerLayer } from "../entities/StickerLayer.entity";
import { LayerDefaults } from "../value-objects/LayerDefaults.vo";
import type { Position, Appearance, TextContent, StickerContent } from "../types";

export class LayerFactory {
  createTextLayer(overrides?: Partial<Position & Appearance & TextContent>): TextLayer {
    const id = LayerDefaults.createId("text");

    return new TextLayer({
      id,
      position: { ...LayerDefaults.position, ...overrides },
      rotation: LayerDefaults.transform.rotation,
      scale: LayerDefaults.transform.scale,
      appearance: { ...LayerDefaults.appearance, ...overrides },
      content: {
        ...LayerDefaults.text,
        ...overrides,
      },
    });
  }

  createStickerLayer(uri: string, overrides?: Partial<Position & Appearance>): StickerLayer {
    const id = LayerDefaults.createId("sticker");

    return new StickerLayer({
      id,
      position: { ...LayerDefaults.position, ...overrides },
      rotation: LayerDefaults.transform.rotation,
      scale: LayerDefaults.transform.scale,
      appearance: { ...LayerDefaults.appearance, ...overrides },
      content: {
        uri,
      },
    });
  }

  duplicateLayer<T extends TextLayer | StickerLayer>(
    layer: T,
    currentLayers: { zIndex: number }[]
  ): T {
    const nextZIndex = LayerDefaults.getNextZIndex(currentLayers);
    const offset = { x: 20, y: 20 };

    if (layer instanceof TextLayer) {
      return new TextLayer({
        ...layer,
        id: LayerDefaults.createId("text"),
        position: {
          x: layer.position.x + offset.x,
          y: layer.position.y + offset.y,
        },
        appearance: {
          ...layer.appearance,
          zIndex: nextZIndex,
        },
      }) as T;
    }

    return new StickerLayer({
      ...layer,
      id: LayerDefaults.createId("sticker"),
      position: {
        x: layer.position.x + offset.x,
        y: layer.position.y + offset.y,
      },
      appearance: {
        ...layer.appearance,
        zIndex: nextZIndex,
      },
    }) as T;
  }
}

// Singleton instance
export const layerFactory = new LayerFactory();
