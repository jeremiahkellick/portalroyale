import Movement from './movement';

class PortalMovement extends Movement {

  constructor(radius) {
    super();
    this.radius = radius || 0;
  }

  update() {
    if ( this.radius <= 20 ) {
      this.gameObject.destroy();
    } else {
      this.radius -= 0.05;
    }
  }

}

export default PortalMovement;