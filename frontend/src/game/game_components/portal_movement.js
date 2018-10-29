import Movement from './movement';
import Time from '../time';

class PortalMovement extends Movement {

  constructor(radius) {
    super();
    this.radius = radius || 0;
  }

  update() {
    if ( this.radius <= 20 ) {
      this.gameObject.destroy();
    } else {
      this.radius -= 3 * Time.deltaTime;
    }
  }

}

export default PortalMovement;