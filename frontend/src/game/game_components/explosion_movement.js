import Movement from './movement';
import Hitpoint from '../game_components/hitpoint';

class ExplosionMovement extends Movement {

  constructor(radius, maxRange) {
    super();
    this.radius = radius || 0;
    this.maxRange = maxRange;
    const sound = new Audio("./sounds/explosion.mp3");
    sound.play();
  }

  update() {
    if ( this.radius < this.maxRange ) {
      const pos = this.transform.position;
      const collidedWith = this.collider.checkAllCollisions(pos);

      if (collidedWith) {
        const hitpoint = collidedWith.getComponent(Hitpoint);
        if (hitpoint) {
          hitpoint.damage(9001);
          this.radius = this.maxRange;
        }
      }
      this.radius += 2;
      this.collider.shape.radius += 2;
    } else {
      this.gameObject.destroy();
    }
  }
}

export default ExplosionMovement;