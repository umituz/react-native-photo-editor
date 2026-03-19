/**
 * Sticker Layer Entity
 * Specialized layer for sticker/image content
 */

import { Layer } from "./Layer.entity";
import type { StickerContent, Position, Appearance } from "../types";

export class StickerLayer extends Layer {
  readonly content: StickerContent;

  constructor(data: {
    id: string;
    position: Position;
    rotation: number;
    scale: number;
    appearance: Appearance;
    content: StickerContent;
  }) {
    super({
      ...data,
      type: "sticker",
    });
    this.content = data.content;
  }

  // Convenience getters
  get uri(): string { return this.content.uri; }

  // Immutable updates
  withUri(uri: string): StickerLayer {
    return new StickerLayer({
      ...this,
      content: { ...this.content, uri },
    });
  }
}
