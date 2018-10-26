import Component from './component';
import Vector from '../vector';
import Input from './input';

class Transform extends Component {
  constructor(position, rotation) {
    super();
    this.position = position || Vector.zero();
    this.rotation = rotation || 0;
  }

  start() {
    this.input = this.gameObject.getComponent(Input);
  }

  getDirection() {
    if ( this.input ) {
      const mousePos = this.input.getMousePosition();
      const playerPos = this.position;
      return mousePos.minus(playerPos).normalized();
    }
    return Vector.zero();
  }

  getRotation() {
    if ( this.input ) {
      const mousePos = this.input.getMousePosition();
      const playerPos = this.position;
      const rotation = Math.acos( (mousePos.x - playerPos.x) / mousePos.distanceTo(playerPos) );
      return playerPos.y > mousePos.y ?  2*Math.PI - rotation  : rotation;
    }
    return 0;
  }

  teleport() {
    this.dispatch({ type: 'TELEPORT' });
  }

  handleAction(action) {
    switch (action.type) {
      case 'TELEPORT':
        this.position = new Vector(200, 200);
        break;
      default:
    }
  }
}

export default Transform;
