import Component from './component';
import Transform from './transform';
import Game from './game';

class Collider extends Component {
  checkAllCollisions(shape) {
    Object.values(Game.game.gameObjects).forEach( (object) => 
      { 
        const objectPos = object.getComponent(Transform).position;
        if (this.gameObject !== object) {
          if (this.circleCollision(shape, {pos: objectPos, radius: 50})) {
            console.log('what');
            return true;
          }
        }
      }
    );
    return false;
  }

  circleCollision(shape1, shape2) {
    let dx = shape1.pos.x - shape2.pos.x;
    let dy = shape1.pos.y - shape2.pos.y;
    let distance = Math.sqrt(dx ** 2 + dy ** 2);
    return distance < shape1.radius + shape2.radius;
  }
}


export default Collider;
