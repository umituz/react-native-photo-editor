/**
 * Transform Value Object
 * Immutable position, scale, and rotation state
 */

export interface TransformData {
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
  readonly scale: number;
}

export class Transform {
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
  readonly scale: number;

  constructor(data: TransformData) {
    this.x = data.x;
    this.y = data.y;
    this.rotation = data.rotation;
    this.scale = data.scale;
  }

  static readonly DEFAULT = new Transform({
    x: 50,
    y: 50,
    rotation: 0,
    scale: 1,
  });

  withX(x: number): Transform {
    return new Transform({ ...this, x });
  }

  withY(y: number): Transform {
    return new Transform({ ...this, y });
  }

  withPosition(position: { x: number; y: number }): Transform {
    return new Transform({ ...this, ...position });
  }

  withRotation(rotation: number): Transform {
    return new Transform({ ...this, rotation });
  }

  withScale(scale: number): Transform {
    return new Transform({ ...this, scale });
  }

  toJSON(): TransformData {
    return {
      x: this.x,
      y: this.y,
      rotation: this.rotation,
      scale: this.scale,
    };
  }
}
