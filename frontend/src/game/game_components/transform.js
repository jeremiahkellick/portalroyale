import Component from './component';
import Vector from '../vector';

class Transform extends Component {
  constructor(position, rotation) {
    super();
    this.position = position || Vector.zero();
    this.rotation = rotation || 0;
  }

  lookAt(point) {
    const rotation = Math.acos(
      (point.x - this.position.x) / point.distanceTo(this.position)
    );
    this.rotation = this.position.y > point.y ?
                    2 * Math.PI - rotation :
                    rotation;
  }

  teleport(position) {
    const sound = new Audio('./sounds/teleport.wav');
    sound.play();
    this.dispatch({ type: 'TELEPORT', position });
  }

  handleAction(action) {
    switch (action.type) {
      case 'TELEPORT':
        this.position = Vector.fromPOJO(action.position);
        break;
      default:
    }
  }
}

export default Transform;
