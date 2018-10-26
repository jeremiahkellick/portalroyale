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

  lookAt(point) {
    const rotation = Math.acos(
      (point.x - this.position.x) / point.distanceTo(this.position)
    );
    this.rotation = this.position.y > point.y ?
                    2 * Math.PI - rotation :
                    rotation;
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
