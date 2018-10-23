import Component from './component';
import Input from './input';
import Transform from './transform';
import Time from './time';

class Shoot extends Component {

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
  }

  update() {
    if (this.input) {
      // const movement = this.input.getMovement().times(300 * Time.deltaTime);
      // const shoot = this.shootBullet(); 
    }
  }
}

export default Shoot;
