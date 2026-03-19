/**
 * Shared Domain Types
 * Central type definitions for the photo editor domain
 */

export type LayerType = "text" | "sticker";
export type TextAlign = "left" | "center" | "right";

export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface Dimensions {
  readonly width?: number;
  readonly height?: number;
}

export interface Appearance {
  readonly opacity: number;
  readonly zIndex: number;
}

export interface TextContent {
  readonly text: string;
  readonly fontSize: number;
  readonly fontFamily: string;
  readonly color: string;
  readonly backgroundColor: string;
  readonly textAlign: TextAlign;
  readonly isBold?: boolean;
  readonly isItalic?: boolean;
}

export interface StickerContent {
  readonly uri: string;
}

export type LayerContent = TextContent | StickerContent;
