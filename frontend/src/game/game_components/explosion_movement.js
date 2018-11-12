import Movement from './movement';
import Hitpoint from '../game_components/hitpoint';
import Time from '../time';

class ExplosionMovement extends Movement {
  constructor(radius, maxRange, owned) {
    super();
    this.radius = radius || 0;
    this.maxRange = maxRange;
    this.owned = owned;
  }

  update() {
    if (this.owned) {
      const pos = this.transform.position;
      const collidedWith = this.collider.checkAllCollisions(pos);

      if (collidedWith) {
        const hitpoint = collidedWith.getComponent(Hitpoint);
        if (hitpoint) hitpoint.damage(9001);
      }
    }
    if ( this.radius < this.maxRange ) {
      this.radius += 800 * Time.deltaTime;
      this.collider.shape.radius += 800 * Time.deltaTime;
    } else {
      this.gameObject.destroy();
    }
  }
}

export default ExplosionMovement;
