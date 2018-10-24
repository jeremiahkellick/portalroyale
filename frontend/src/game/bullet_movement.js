import Transform from './transform';
import Collider from './collider';
import Movement from './movement'; 

class BulletMovement extends Movement {

  constructor(range, speed) {
    super(); 
    this.range = range; 
    this.speed = speed; 
    this.distanceTraveled = 0; 
  }

  update() { 
    const oldPos = this.transform.position
    const newPos = oldPos.plus( this.speed ); 
    if ( this.distanceTraveled <= this.range && !this.collider.checkAllCollisions(newPos)) {
      this.transform.position = newPos;
      this.distanceTraveled += oldPos.distanceTo(newPos);  
    } else {
      this.gameObject.destroy(); 
    }
  }
}

export default BulletMovement;
