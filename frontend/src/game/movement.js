import Component from './component';
import Input from './input';
import Transform from './transform';
import Time from './time';
import Collider from './collider';
import Vector from '../vector';

class Movement extends Component {
  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
    this.collider = this.gameObject.getComponent(Collider);
  }

  update() {
    if (this.input) {
      const movement = this.input.getMovement().times(300 * Time.deltaTime);
      const newXPos = this.transform.position.plus(new Vector(movement.x, 0));
      if (!this.collider.checkAllCollisions(newXPos, true)) {
        this.transform.position.x += movement.x;
      }
      const newYPos = this.transform.position.plus(new Vector(0, movement.y));
      if (!this.collider.checkAllCollisions(newYPos, true)) {
        this.transform.position.y += movement.y;
      }
    }
  }
}

export default Movement;
