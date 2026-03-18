/**
 * Filters Value Object
 * Represents image filter adjustments
 */

export interface FilterValues {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  grayscale: number;
  hueRotate?: number;
}

export const DEFAULT_FILTERS: FilterValues = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  sepia: 0,
  grayscale: 0,
};

export class FiltersVO {
  constructor(private readonly value: FilterValues) {}

  get brightness(): number { return this.value.brightness; }
  get contrast(): number { return this.value.contrast; }
  get saturation(): number { return this.value.saturation; }
  get sepia(): number { return this.value.sepia; }
  get grayscale(): number { return this.value.grayscale; }
  get hueRotate(): number | undefined { return this.value.hueRotate; }

  withBrightness(brightness: number): FiltersVO {
    return new FiltersVO({ ...this.value, brightness });
  }

  withContrast(contrast: number): FiltersVO {
    return new FiltersVO({ ...this.value, contrast });
  }

  withSaturation(saturation: number): FiltersVO {
    return new FiltersVO({ ...this.value, saturation });
  }

  withSepia(sepia: number): FiltersVO {
    return new FiltersVO({ ...this.value, sepia });
  }

  withGrayscale(grayscale: number): FiltersVO {
    return new FiltersVO({ ...this.value, grayscale });
  }

  withHueRotate(hueRotate: number): FiltersVO {
    return new FiltersVO({ ...this.value, hueRotate });
  }

  reset(): FiltersVO {
    return new FiltersVO(DEFAULT_FILTERS);
  }

  toJSON(): FilterValues {
    return { ...this.value };
  }

  static from(filters: FilterValues): FiltersVO {
    return new FiltersVO(filters);
  }

  static default(): FiltersVO {
    return new FiltersVO(DEFAULT_FILTERS);
  }
}
