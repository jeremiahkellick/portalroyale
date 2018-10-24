import Component from './component';
import Transform from './transform';
import Circle from './circle';
import Rectangle from './rectangle';
// import Line from './line';
import Game from './game';
import Vector from '../vector';
import Movement from './movement';
import Hitpoint from './hitpoint';
import BulletRenderer from './renderers/bullet_renderer';

class Collider extends Component {
  constructor(shape) {
    super();
    this.shape = shape;
  }

  checkAllCollisions(newPos) {
    let flag = false;

    Object.values(Game.game.gameObjects).forEach( (object) => 
      { 
        if (object.getComponent(Collider) === undefined || 
            (!this.gameObject.getComponent(BulletRenderer) && object.getComponent(Movement))) {

          return;
        }
        const objectPos = object.getComponent(Transform).position;
        const objectShape = object.getComponent(Collider).shape;
        if (this.gameObject !== object) {
          let shapeArr;
          if (this.shape.constructor.name > objectShape.constructor.name) {
            shapeArr = [{pos: objectPos, shape: objectShape}, {pos: newPos, shape: this.shape}]
          } else {
            shapeArr = [{pos: newPos, shape: this.shape}, {pos: objectPos, shape: objectShape}]
          }
          if (this.checkTypeCollision(...shapeArr)) {
            flag = true;
            if (this.gameObject.getComponent(BulletRenderer) && object.getComponent(Hitpoint)) {
              object.getComponent(Hitpoint).damage(10);
            }
          }
        }
      }
    );
    return flag;
  }

  checkTypeCollision(shape1, shape2) {
    if (shape1.shape instanceof Circle && shape2.shape instanceof Circle) {
      return this.circleCircleCollision(shape1, shape2);
    }
    else if (shape1.shape instanceof Rectangle && shape2.shape instanceof Rectangle) {
      return this.rectRectCollision(shape1, shape2);
    }
    else if (shape1.shape instanceof Circle && shape2.shape instanceof Rectangle) {
      return this.circleRectCollision(shape1, shape2);
    }
    // else if (shape1 instanceof Circle && shape2 instanceof Line) {
    //   return this.circleLineCollision(shape1, shape2);
    // }
    // else if (shape1 instanceof Line && shape2 instanceof Rectangle) {
    //   return this.lineRectCollision(shape1, shape2);
    // }
  }

  rectRectCollision(shape1, shape2) {
    return shape1.pos.x < shape2.pos.x + shape2.width &&
      shape1.pos.x + shape1.width > shape2.pos.x &&
      shape1.pos.y < shape2.pos.y + shape2.height &&
      shape1.pos.y + shape1.height > shape2.pos.y
  }

  circleCircleCollision(shape1, shape2) {
    let dx = shape1.pos.x - shape2.pos.x;
    let dy = shape1.pos.y - shape2.pos.y;
    let distance = Math.sqrt(dx ** 2 + dy ** 2);
    return distance < shape1.shape.radius + shape2.shape.radius;
  }

  circleRectCollision(circle, rect) {
    let rectX = rect.pos.x + rect.width/2;
    let rectY = rect.pos.y + rect.height/2;
    let circleDistanceX = Math.abs(circle.pos.x - rectX);
    let circleDistanceY = Math.abs(circle.pos.y - rectY);

    if (circleDistanceX > (rect.width/2 + circle.radius)) return false;
    else if (circleDistanceY > (rect.height/2 + circle.radius)) return false;
    else if (circleDistanceX <= rect.width/2) return true;
    else if (circleDistanceX <= rect.height/2) return true;
    else {
      let cornerDistanceSq = (circleDistanceX - rect.width/2) ** 2 +
                              (circleDistanceY - rect.height/2) ** 2;
      return cornerDistanceSq <= (circle.radius ** 2);
    }
  }

  circleLineCollision(circle, line) {
    let AB = new Vector(line.pos2.x - line.pos1.x, line.pos2.y - line.pos1.y);
    let AC = new Vector(circle.pos.x - line.pos1.x, circle.pos.y - line.pos1.y);
    let orthogonal = AC.minus(AB.times(AC.dotProduct(AB) / AB.dotProduct(AB)));
    return orthogonal.magnitude() < circle.radius;
  }

  lineRectCollision(line, rect) {
    const edgeLeft = this.shape1.pos.x;
    const edgeRight = this.shape1.pos.x + this.shape1.width;
    const edgeTop = this.shape1.pos.y + this.shape1.height;
    const edgeBottom = this.shape1.pos.y;
    const x0src = this.shape2.pos1.x;
    const x1src = this.shape2.pos2.x;
    const y0src = this.shape2.pos1.y;
    const y1src = this.shape2.pos2.y;

    let t0 = 0.0;
    let t1 = 1.0;
    const xdelta = x1src-x0src;
    const ydelta = y1src-y0src;
    let p, q, r;

    for(let edge=0; edge<4; edge++) {   // Traverse through left, right, bottom, top edges.
        if (edge === 0) {  p = -xdelta;    q = -(edgeLeft-x0src);  }
        if (edge === 1) {  p = xdelta;     q =  (edgeRight-x0src); }
        if (edge === 2) {  p = -ydelta;    q = -(edgeBottom-y0src);}
        if (edge === 3) {  p = ydelta;     q =  (edgeTop-y0src);   }
        r = q/p;
        if(p === 0 && q<0) return false;   // Don't draw line at all. (parallel line outside)

        if(p<0) {
            if(r>t1) return false;         // Don't draw line at all.
            else if(r>t0) t0=r;            // Line is clipped!
        } else if(p>0) {
            if(r<t0) return false;      // Don't draw line at all.
            else if(r<t1) t1=r;         // Line is clipped!
        }
    }
    return true;
  }
}


export default Collider;
