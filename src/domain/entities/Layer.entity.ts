/**
 * Base Layer Entity
 * Core layer abstraction with transform and appearance
 */

import type { LayerType, Position, Appearance, LayerContent } from "../types";
import type { TextLayer } from "./TextLayer.entity";
import type { StickerLayer } from "./StickerLayer.entity";
import { TextLayer as TextLayerClass } from "./TextLayer.entity";
import { StickerLayer as StickerLayerClass } from "./StickerLayer.entity";

export class Layer {
  readonly id: string;
  readonly type: LayerType;
  readonly position: Position;
  readonly rotation: number;
  readonly scale: number;
  readonly appearance: Appearance;
  readonly content: LayerContent;

  constructor(data: {
    id: string;
    type: LayerType;
    position: Position;
    rotation: number;
    scale: number;
    appearance: Appearance;
    content: LayerContent;
  }) {
    this.id = data.id;
    this.type = data.type;
    this.position = data.position;
    this.rotation = data.rotation;
    this.scale = data.scale;
    this.appearance = data.appearance;
    this.content = data.content;
  }

  // Convenience getters for backward compatibility
  get x(): number { return this.position.x; }
  get y(): number { return this.position.y; }
  get zIndex(): number { return this.appearance.zIndex; }
  get opacity(): number { return this.appearance.opacity; }

  // Type guards
  isText(): this is TextLayer {
    return this.type === "text";
  }

  isSticker(): this is StickerLayer {
    return this.type === "sticker";
  }

  // Immutable updates
  withPosition(position: Partial<Position>): Layer {
    return new Layer({
      ...this,
      position: { ...this.position, ...position },
    });
  }

  withTransform(transform: { rotation?: number; scale?: number }): Layer {
    return new Layer({
      ...this,
      ...transform,
    });
  }

  withAppearance(appearance: Partial<Appearance>): Layer {
    return new Layer({
      ...this,
      appearance: { ...this.appearance, ...appearance },
    });
  }

  withZIndex(zIndex: number): Layer {
    return this.withAppearance({ zIndex });
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      x: this.position.x,
      y: this.position.y,
      rotation: this.rotation,
      scale: this.scale,
      opacity: this.appearance.opacity,
      zIndex: this.appearance.zIndex,
      ...this.content,
    };
  }

  static from(data: ReturnType<Layer["toJSON"]>): Layer {
    if (data.type === "text") {
      return new TextLayerClass({
        id: data.id,
        position: { x: data.x, y: data.y },
        rotation: data.rotation,
        scale: data.scale,
        appearance: { opacity: data.opacity, zIndex: data.zIndex },
        content: {
          text: (data as Record<string, unknown>).text as string || "",
          fontSize: (data as Record<string, unknown>).fontSize as number || 32,
          fontFamily: (data as Record<string, unknown>).fontFamily as string || "System",
          color: (data as Record<string, unknown>).color as string || "#FFFFFF",
          backgroundColor: (data as Record<string, unknown>).backgroundColor as string || "transparent",
          textAlign: (data as Record<string, unknown>).textAlign as "left" | "center" | "right" || "center",
          isBold: (data as Record<string, unknown>).isBold as boolean || undefined,
          isItalic: (data as Record<string, unknown>).isItalic as boolean || undefined,
        },
      });
    }
    return new StickerLayerClass({
      id: data.id,
      position: { x: data.x, y: data.y },
      rotation: data.rotation,
      scale: data.scale,
      appearance: { opacity: data.opacity, zIndex: data.zIndex },
      content: { uri: (data as Record<string, unknown>).uri as string || "" },
    });
  }
}

// Type exports for backward compatibility
export type { TextLayer } from "./TextLayer.entity";
export type { StickerLayer } from "./StickerLayer.entity";
export type { TextAlign } from "../types";

// Type guard functions for backward compatibility
export function isTextLayer(layer: Layer): layer is TextLayer {
  return layer.isText();
}

export function isStickerLayer(layer: Layer): layer is StickerLayer {
  return layer.isSticker();
}

