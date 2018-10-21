class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static zero() {
    return new Vector(0, 0);
  };

  static one() {
    return new Vector(1, 1);
  }

  plus(otherVector) {
    return new Vector(this.x + otherVector.x, this.y + otherVector.y);
  };

  minus(otherVector) {
    return new Vector(this.x - otherVector.x, this.y - otherVector.y);
  };

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  distanceTo(otherVector) {
    return this.minus(otherVector).magnitude();
  };

  times(arg) {
    if (arg instanceof Vector) {
      return new Vector(this.x * arg.x, this.y * arg.y);
    } else if (typeof arg === 'number') {
      return new Vector(this.x * arg, this.y * arg);
    }
  };

  dividedBy(arg) {
    if (arg instanceof Vector) {
      return new Vector(this.x / arg.x, this.y / arg.y);
    } else if (typeof arg === 'number') {
      return new Vector(this.x / arg, this.y / arg);
    }
  };

  normalized() {
    return this.dividedBy(this.magnitude());
  };
}

export default Vector;
