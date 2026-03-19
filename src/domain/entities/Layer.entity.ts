/**
 * Base Layer Entity
 * Core layer abstraction with transform and appearance
 */

import type { LayerType, Position, Appearance, LayerContent } from "../types";
import type { TextLayer } from "./TextLayer.entity";
import type { StickerLayer } from "./StickerLayer.entity";

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
}

// Re-export for convenience
export type { TextLayer } from "./TextLayer.entity";
export type { StickerLayer } from "./StickerLayer.entity";

