import Component from './component';
import Vector from '../vector';

class Transform extends Component {
  constructor(position, rotation) {
    super();
    this.position = position || Vector.zero();
    this.rotation = rotation || 0;
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
