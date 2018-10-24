import Movement from './movement';
import Time from './time';

class BulletMovement extends Movement {

  constructor(range, speed) {
    super();
    this.range = range;
    this.speed = speed;
    this.distanceTraveled = 0;
  }

  update() {
    const oldPos = this.transform.position
    const newPos = oldPos.plus(this.speed.times(Time.deltaTime));
    if ( this.distanceTraveled <= this.range && !this.collider.checkAllCollisions(newPos)) {
      this.transform.position = newPos;
      this.distanceTraveled += oldPos.distanceTo(newPos);
    } else {
      this.gameObject.destroy();
    }
  }
}

export default BulletMovement;
