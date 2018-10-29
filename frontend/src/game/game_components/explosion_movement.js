import Movement from './movement';
import Hitpoint from '../game_components/hitpoint';
import Time from '../time';

class ExplosionMovement extends Movement {

  constructor(radius, maxRange) {
    super();
    this.radius = radius || 0;
    this.maxRange = maxRange;
  }

  update() {
    if ( this.radius < this.maxRange ) {

      if ( this.radius === 50 ) {
        const sound = new Audio("./sounds/explosion.mp3");
        sound.play();
      }

      const pos = this.transform.position;
      const collidedWith = this.collider.checkAllCollisions(pos);

      if (collidedWith) {
        const hitpoint = collidedWith.getComponent(Hitpoint);
        if (hitpoint) {
          hitpoint.damage(9001);
          this.radius = this.maxRange;
        }
      }
      this.radius += 120 * Time.deltaTime;
      this.collider.shape.radius += 120 * Time.deltaTime;
    } else {
      this.gameObject.destroy();
    }
  }
}

export default ExplosionMovement;