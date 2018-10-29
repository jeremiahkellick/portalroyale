import Component from './component';
import Transform from './transform';

class Item extends Component {
  constructor(shape) {
    super();
    this.shape = shape;
  }
  start() {
    this.transform = this.requireComponent(Transform);
  }

  itemInRange(pos) {
    const itemPos = this.transform.position;
    let distance = Math.sqrt((pos.x - itemPos.x) ** 2 + (pos.y - itemPos.y) ** 2)
    return this.shape.radius >= distance;
  }

  pickUp() {
    this.dispatch({ type: 'DESTROY'});
  }

  handleAction(action) {
    switch (action.type) {
      case 'DESTROY':
        this.gameObject.destroy();
        break;
      default:
    }
  }
}

export default Item;
