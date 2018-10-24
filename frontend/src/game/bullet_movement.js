import Movement from './movement';
import Time from './time';
import Hitpoint from './hitpoint';

class BulletMovement extends Movement {

  constructor(range, speed, owned = false) {
    super();
    this.range = range;
    this.speed = speed;
    this.distanceTraveled = 0;
    this.owned = owned;
  }

  update() {
    const oldPos = this.transform.position
    const newPos = oldPos.plus(this.speed.times(Time.deltaTime));

    if (this.distanceTraveled > this.range) {
      this.gameObject.destroy();
    } else {
      const collidedWith = this.collider.checkAllCollisions(newPos);
      if (collidedWith) {
        if (this.owned) {
          const hitpoint = collidedWith.getComponent(Hitpoint);
          if (hitpoint) {
            hitpoint.damage(10);
          }
        }
        this.gameObject.destroy();
      } else {
        this.transform.position = newPos;
        this.distanceTraveled += oldPos.distanceTo(newPos);
      }
    }
  }
}

export default BulletMovement;
