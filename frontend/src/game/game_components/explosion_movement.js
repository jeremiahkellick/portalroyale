import Movement from './movement';

class ExplosionMovement extends Movement {

  constructor(radius, maxRange) {
    super();
    this.radius = radius || 0;
    this.maxRange = maxRange;
  }

  update() {
    if ( this.radius < this.maxRange ) {
      this.radius += 1;
    } else {
      this.gameObject.destroy();
    }
  }
}

export default ExplosionMovement;