import Movement from './movement';

class PortalMovement extends Movement {

  constructor(radius) {
    super();
    this.radius = radius || 0;
  }

  update() {
    if ( this.radius <= 0 ) {
      this.gameObject.destroy();
    } else {
      this.radius -= .05;
    }
  }

}

export default PortalMovement;