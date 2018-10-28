import Movement from './movement';
import Time from '../time';
import Hitpoint from './hitpoint';

class BulletMovement extends Movement {

  constructor(range, speed, owned = false) {
    super();
    this.range = range;
    this.bulletSpeed = speed;
    this.distanceTraveled = 0;
    this.length = 3;
    this.owned = owned;
    this.active = true;
  }

  update() {
    if (this.active) {
      const oldPos = this.transform.position
      const newPos = oldPos.plus(this.bulletSpeed.times(Time.deltaTime));

      if (this.distanceTraveled > this.range) {
        this.gameObject.destroy();
      } else {
        this.transform.position = newPos;
        this.distanceTraveled += oldPos.distanceTo(newPos);
        this.length = Math.min(500, this.distanceTraveled);
        const collidedWith = this.collider.checkAllCollisions(newPos);
        if (collidedWith) {
          if (this.owned) {
            const hitpoint = collidedWith.getComponent(Hitpoint);
            if (hitpoint) {
              hitpoint.damage(10);
            }
          }
          const sound = new Audio("./sounds/impact.mp3");
          sound.play();
          this.active = false;
        }
      }
    } else {
      this.length -= this.bulletSpeed.magnitude() * Time.deltaTime;
      if (this.length < 3) this.gameObject.destroy();
    }
  }
}

export default BulletMovement;
