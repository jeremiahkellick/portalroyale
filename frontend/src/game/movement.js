import Component from './component';
import Input from './input';
import Transform from './transform';
import Time from './time';

class Movement extends Component {
  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
  }

  update() {
    if (this.input) {
      const movement = this.input.getMovement().times(300 * Time.deltaTime);
      this.transform.position = this.transform.position.plus(movement);
    }
  }
}

export default Movement;
