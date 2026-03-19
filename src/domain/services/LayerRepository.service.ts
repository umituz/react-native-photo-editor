/**
 * Layer Repository Service
 * CRUD operations for layers with history support
 */

import type { Layer } from "../entities/Layer.entity".entity";
import { LayerFactory } from "./LayerFactory.service";

export class LayerRepository {
  constructor(private factory: LayerFactory) {}

  createLayer(
    type: "text" | "sticker",
    content: string,
    currentLayers: Layer[]
  ): Layer {
    if (type === "text") {
      return this.factory.createTextLayer({
        zIndex: this.getNextZIndex(currentLayers),
      });
    }

    return this.factory.createStickerLayer(content || "", {
      zIndex: this.getNextZIndex(currentLayers),
    });
  }

  updateLayer(
    layers: Layer[],
    layerId: string,
    updates: Partial<{ position: { x: number; y: number }; rotation: number; scale: number }>
  ): Layer[] {
    return layers.map((layer) =>
      layer.id === layerId
        ? layer.withPosition(updates.position || {}).withTransform({
            rotation: updates.rotation,
            scale: updates.scale,
          })
        : layer
    );
  }

  deleteLayer(layers: Layer[], layerId: string): Layer[] {
    return layers.filter((layer) => layer.id !== layerId);
  }

  duplicateLayer(layers: Layer[], layerId: string): Layer[] {
    const layer = layers.find((l) => l.id === layerId);
    if (!layer) return layers;

    const duplicate = this.factory.duplicateLayer(layer, layers);
    return [...layers, duplicate];
  }

  reorderLayers(layers: Layer[], layerId: string, direction: "up" | "down"): Layer[] {
    const sorted = this.sortByZIndex(layers);
    const idx = sorted.findIndex((l) => l.id === layerId);

    if (idx === -1) return layers;
    if (direction === "up" && idx >= sorted.length - 1) return layers;
    if (direction === "down" && idx <= 0) return layers;

    const reordered = [...sorted];
    const targetIdx = direction === "up" ? idx + 1 : idx - 1;
    [reordered[idx], reordered[targetIdx]] = [reordered[targetIdx], reordered[idx]];

    return this.reassignZIndex(reordered);
  }

  sortByZIndex(layers: Layer[]): Layer[] {
    return [...layers].sort((a, b) => a.appearance.zIndex - b.appearance.zIndex);
  }

  private getNextZIndex(layers: Layer[]): number {
    return layers.length > 0 ? Math.max(...layers.map((l) => l.appearance.zIndex)) + 1 : 0;
  }

  private reassignZIndex(layers: Layer[]): Layer[] {
    return layers.map((layer, i) => layer.withAppearance({ zIndex: i }));
  }
}

// Singleton instance
import { layerFactory } from "./LayerFactory.service";
export const layerRepository = new LayerRepository(layerFactory);
