import Component from './component';
import Input from './input';
import Transform from './transform';
import Time from './time';
import Collider from './collider';

class Movement extends Component {
  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
    this.collider = this.gameObject.getComponent(Collider);
  }

  update() {
    if (this.input) {
      const movement = this.input.getMovement().times(300 * Time.deltaTime);
      const newPos = this.transform.position.plus(movement);
      const person = {pos: newPos, radius: 50};
      console.log(this.collider.checkAllCollisions(person));
      if (!this.collider.checkAllCollisions(person)) {
        this.transform.position = newPos;
      }
    }
  }
}

export default Movement;
