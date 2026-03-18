/**
 * Layer Entities
 * Base layer and specialized text/sticker layers
 */

import type { Transform } from "./Transform";

export type LayerType = "text" | "sticker";
export type TextAlign = "left" | "center" | "right";

export interface BaseLayerData {
  id: string;
  type: LayerType;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export interface TextLayerData extends BaseLayerData {
  type: "text";
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  textAlign: TextAlign;
  isBold?: boolean;
  isItalic?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface StickerLayerData extends BaseLayerData {
  type: "sticker";
  uri: string;
}

export type LayerData = TextLayerData | StickerLayerData;

export class Layer {
  constructor(private readonly data: LayerData) {}

  get id(): string { return this.data.id; }
  get type(): LayerType { return this.data.type; }
  get x(): number { return this.data.x; }
  get y(): number { return this.data.y; }
  get rotation(): number { return this.data.rotation; }
  get scale(): number { return this.data.scale; }
  get opacity(): number { return this.data.opacity; }
  get zIndex(): number { return this.data.zIndex; }

  isText(): this is TextLayer {
    return this.data.type === "text";
  }

  isSticker(): this is StickerLayer {
    return this.data.type === "sticker";
  }

  withTransform(transform: Partial<Transform>): Layer {
    const newData = { ...this.data, ...transform };
    return this.recreate(newData);
  }

  withOpacity(opacity: number): Layer {
    return this.recreate({ ...this.data, opacity });
  }

  withZIndex(zIndex: number): Layer {
    return this.recreate({ ...this.data, zIndex });
  }

  protected recreate(data: LayerData): Layer {
    return data.type === "text" ? new TextLayer(data) : new StickerLayer(data);
  }

  toJSON(): LayerData {
    return { ...this.data };
  }

  static from(data: LayerData): Layer {
    return data.type === "text" ? new TextLayer(data) : new StickerLayer(data);
  }
}

export class TextLayer extends Layer {
  declare readonly data: TextLayerData;

  get text(): string { return this.data.text; }
  get fontSize(): number { return this.data.fontSize; }
  get fontFamily(): string { return this.data.fontFamily; }
  get color(): string { return this.data.color; }
  get backgroundColor(): string { return this.data.backgroundColor; }
  get textAlign(): TextAlign { return this.data.textAlign; }
  get isBold(): boolean { return this.data.isBold ?? false; }
  get isItalic(): boolean { return this.data.isItalic ?? false; }

  withText(text: string): TextLayer {
    return new TextLayer({ ...this.data, text });
  }

  withStyle(styles: Partial<Omit<TextLayerData, "id" | "type">>): TextLayer {
    return new TextLayer({ ...this.data, ...styles });
  }
}

export class StickerLayer extends Layer {
  declare readonly data: StickerLayerData;

  get uri(): string { return this.data.uri; }

  withUri(uri: string): StickerLayer {
    return new StickerLayer({ ...this.data, uri });
  }
}

export function isTextLayer(layer: Layer): layer is TextLayer {
  return layer.isText();
}

export function isStickerLayer(layer: Layer): layer is StickerLayer {
  return layer.isSticker();
}
