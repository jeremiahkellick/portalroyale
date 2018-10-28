import Component from './component';
import Input from './input';
import Transform from './transform';
import Time from '../time';
import Collider from './collider';
import Speed from './speed';
import Vector from '../vector';

class Movement extends Component {
  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
    this.collider = this.gameObject.getComponent(Collider);
    this.speed = this.gameObject.getComponent(Speed);
  }

  update() {
    if (this.input) {
      const speed = (this.speed ? this.speed.speedMultiplier : 1);
      const movement = this.input.getMovement().times(300 * Time.deltaTime * speed);

      const newXPos = this.transform.position.plus(new Vector(movement.x, 0));
      if ( !this.collider.checkMapBoundaries(newXPos)) {
        if (!this.collider.checkAllCollisions(newXPos, true)) {
          this.transform.position.x += movement.x;
        }
      }

      const newYPos = this.transform.position.plus(new Vector(0, movement.y));
      if ( !this.collider.checkMapBoundaries(newYPos) ) {
        if (!this.collider.checkAllCollisions(newYPos, true)) {
          this.transform.position.y += movement.y;
        }
      }

      this.transform.lookAt(this.input.mousePosition());

    }
  }

}

export default Movement;
