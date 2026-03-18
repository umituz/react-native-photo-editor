/**
 * Layer Service
 * Business logic for layer operations
 */

import { Layer, TextLayer, StickerLayer, isTextLayer } from "../entities/Layer";
import type { Transform } from "../entities/Transform";

export class LayerService {
  generateId(type: "text" | "sticker"): string {
    return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  createTextLayer(overrides: Partial<Omit<TextLayerData, "id" | "type">> = {}): TextLayer {
    const id = this.generateId("text");
    const defaults: TextLayerData = {
      id,
      type: "text",
      text: "",
      x: 50,
      y: 50,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: 0,
      fontSize: 32,
      fontFamily: "System",
      color: "#FFFFFF",
      backgroundColor: "transparent",
      textAlign: "center",
      isBold: false,
      isItalic: false,
    };

    return new TextLayer({ ...defaults, ...overrides });
  }

  createStickerLayer(uri: string, overrides: Partial<Omit<StickerLayerData, "id" | "type" | "uri">> = {}): StickerLayer {
    const id = this.generateId("sticker");
    const defaults: StickerLayerData = {
      id,
      type: "sticker",
      uri,
      x: 100,
      y: 100,
      rotation: 0,
      scale: 1,
      opacity: 1,
      zIndex: 0,
    };

    return new StickerLayer({ ...defaults, ...overrides });
  }

  updateLayer(layers: Layer[], layerId: string, updates: Partial<Transform>): Layer[] {
    return layers.map(layer =>
      layer.id === layerId ? layer.withTransform(updates) : layer
    );
  }

  deleteLayer(layers: Layer[], layerId: string): Layer[] {
    return layers.filter(layer => layer.id !== layerId);
  }

  duplicateLayer(layers: Layer[], layerId: string): Layer[] {
    const layer = layers.find(l => l.id === layerId);
    if (!layer) return layers;

    const maxZIndex = layers.length > 0 ? Math.max(...layers.map(l => l.zIndex)) : -1;
    const duplicateData = { ...layer.toJSON(), id: this.generateId(layer.type), x: layer.x + 20, y: layer.y + 20, zIndex: maxZIndex + 1 };
    const duplicate = Layer.from(duplicateData);

    return [...layers, duplicate];
  }

  moveLayerUp(layers: Layer[], layerId: string): Layer[] {
    const sorted = this.sortByZIndex(layers);
    const idx = sorted.findIndex(l => l.id === layerId);
    if (idx >= sorted.length - 1) return layers;

    const reordered = [...sorted];
    [reordered[idx], reordered[idx + 1]] = [reordered[idx + 1], reordered[idx]];

    return this.reassignZIndex(reordered);
  }

  moveLayerDown(layers: Layer[], layerId: string): Layer[] {
    const sorted = this.sortByZIndex(layers);
    const idx = sorted.findIndex(l => l.id === layerId);
    if (idx <= 0) return layers;

    const reordered = [...sorted];
    [reordered[idx], reordered[idx - 1]] = [reordered[idx - 1], reordered[idx]];

    return this.reassignZIndex(reordered);
  }

  sortByZIndex(layers: Layer[]): Layer[] {
    return [...layers].sort((a, b) => a.zIndex - b.zIndex);
  }

  private reassignZIndex(layers: Layer[]): Layer[] {
    return layers.map((layer, i) => layer.withZIndex(i));
  }
}
