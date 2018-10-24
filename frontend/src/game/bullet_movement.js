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
    const collision = this.collider.checkAllCollisions(newPos); 
    if ( this.distanceTraveled <= this.range && !collision ) {
      this.transform.position = newPos;
      this.distanceTraveled += oldPos.distanceTo(newPos);
    } else {

      if ( collision ){
        const sound = new Audio("./sounds/impact.mp3"); 
        sound.play(); 
      }

      this.gameObject.destroy();
    }
  }
}

export default BulletMovement;
