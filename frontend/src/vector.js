import { randomInt } from './game/util'; 

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

  static fromPOJO(pojo) {
    return new Vector(pojo.x, pojo.y);
  }

  static random(map) {
    const x = randomInt(0, map.width); 
    const y = randomInt(0, map.height); 
    return new Vector(x, y); 
  }
  
  static lerp(a, b, factor) {
    if (factor < 0 || factor >= 1) return b.clone();
    return a.plus(b.minus(a).times(factor));
  }

  plus(otherVector) {
    return new Vector(this.x + otherVector.x, this.y + otherVector.y);
  };

  minus(otherVector) {
    return new Vector(this.x - otherVector.x, this.y - otherVector.y);
  };

  dotProduct(otherVector) {
    return this.x * otherVector.x + this.y * otherVector.y;
  }

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
    if (this.magnitude() === 0) return Vector.zero();
    return this.dividedBy(this.magnitude());
  };

  toPOJO() {
    return { x: this.x, y: this.y };
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}

export default Vector;
