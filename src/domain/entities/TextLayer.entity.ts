/**
 * Text Layer Entity
 * Specialized layer for text content with font and style properties
 */

import { Layer } from "./Layer.entity";
import type { TextContent, Position, Appearance, TextAlign } from "../types";

export class TextLayer extends Layer {
  readonly content: TextContent;

  constructor(data: {
    id: string;
    position: Position;
    rotation: number;
    scale: number;
    appearance: Appearance;
    content: TextContent;
  }) {
    super({
      ...data,
      type: "text",
    });
    this.content = data.content;
  }

  // Convenience getters
  get text(): string { return this.content.text; }
  get fontSize(): number { return this.content.fontSize; }
  get fontFamily(): string { return this.content.fontFamily; }
  get color(): string { return this.content.color; }
  get backgroundColor(): string { return this.content.backgroundColor; }
  get textAlign(): TextAlign { return this.content.textAlign; }
  get isBold(): boolean { return this.content.isBold ?? false; }
  get isItalic(): boolean { return this.content.isItalic ?? false; }

  // Immutable updates
  withText(text: string): TextLayer {
    return new TextLayer({
      ...this,
      content: { ...this.content, text },
    });
  }

  withStyle(styles: Partial<Omit<TextContent, "text">>): TextLayer {
    return new TextLayer({
      ...this,
      content: { ...this.content, ...styles },
    });
  }

  withContent(content: Partial<TextContent>): TextLayer {
    return new TextLayer({
      ...this,
      content: { ...this.content, ...content },
    });
  }
}
