/**
 * Filter Settings Value Object
 * Immutable image filter adjustments
 */

export interface FilterData {
  readonly brightness: number;
  readonly contrast: number;
  readonly saturation: number;
  readonly sepia: number;
  readonly grayscale: number;
  readonly hueRotate?: number;
}

export class FilterSettings {
  readonly brightness: number;
  readonly contrast: number;
  readonly saturation: number;
  readonly sepia: number;
  readonly grayscale: number;
  readonly hueRotate?: number;

  constructor(data: FilterData) {
    this.brightness = data.brightness;
    this.contrast = data.contrast;
    this.saturation = data.saturation;
    this.sepia = data.sepia;
    this.grayscale = data.grayscale;
    this.hueRotate = data.hueRotate;
  }

  static readonly DEFAULT = new FilterSettings({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    sepia: 0,
    grayscale: 0,
  });

  withBrightness(brightness: number): FilterSettings {
    return new FilterSettings({ ...this, brightness });
  }

  withContrast(contrast: number): FilterSettings {
    return new FilterSettings({ ...this, contrast });
  }

  withSaturation(saturation: number): FilterSettings {
    return new FilterSettings({ ...this, saturation });
  }

  withSepia(sepia: number): FilterSettings {
    return new FilterSettings({ ...this, sepia });
  }

  withGrayscale(grayscale: number): FilterSettings {
    return new FilterSettings({ ...this, grayscale });
  }

  withHueRotate(hueRotate: number): FilterSettings {
    return new FilterSettings({ ...this, hueRotate });
  }

  reset(): FilterSettings {
    return FilterSettings.DEFAULT;
  }

  toJSON(): FilterData {
    return {
      brightness: this.brightness,
      contrast: this.contrast,
      saturation: this.saturation,
      sepia: this.sepia,
      grayscale: this.grayscale,
      hueRotate: this.hueRotate,
    };
  }

  toRecord(): Record<string, number> {
    return {
      brightness: this.brightness,
      contrast: this.contrast,
      saturation: this.saturation,
      sepia: this.sepia,
      grayscale: this.grayscale,
      ...(this.hueRotate !== undefined && { hueRotate: this.hueRotate }),
    } as Record<string, number>;
  }
}
