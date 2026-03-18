/**
 * Transform Value Object
 * Represents position, scale, and rotation state
 */

export interface Transform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export const DEFAULT_TRANSFORM: Transform = {
  x: 50,
  y: 50,
  scale: 1,
  rotation: 0,
};

export class TransformVO {
  constructor(private readonly value: Transform) {}

  get x(): number { return this.value.x; }
  get y(): number { return this.value.y; }
  get scale(): number { return this.value.scale; }
  get rotation(): number { return this.value.rotation; }

  withX(x: number): TransformVO {
    return new TransformVO({ ...this.value, x });
  }

  withY(y: number): TransformVO {
    return new TransformVO({ ...this.value, y });
  }

  withScale(scale: number): TransformVO {
    return new TransformVO({ ...this.value, scale });
  }

  withRotation(rotation: number): TransformVO {
    return new TransformVO({ ...this.value, rotation });
  }

  toJSON(): Transform {
    return { ...this.value };
  }

  static from(transform: Transform): TransformVO {
    return new TransformVO(transform);
  }

  static default(): TransformVO {
    return new TransformVO(DEFAULT_TRANSFORM);
  }
}
