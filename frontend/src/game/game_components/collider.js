import Component from './component';
import Transform from './transform';
import Circle from '../shapes/circle';
import Rectangle from '../shapes/rectangle';
import Game from '../game';
import Vector from '../vector';

const layers = {
  'player': new Set(['obstacle']),
  'bullet': new Set(['obstacle', 'player']),
  'obstacle': new Set(['obstacle', 'player', 'bullet'])
}

class Collider extends Component {
  constructor(shape, layer) {
    super();
    this.shape = shape;
    this.layer = layer;
  }

  checkAllCollisions(newPos, ignoreMoving = false) {
    let collidedWith = null;
    Object.values(Game.game.gameObjects).forEach( (object) =>
      {
        const otherCollider = object.getComponent(Collider);
        if (otherCollider === undefined) return;
        const useLayers = this.layer !== undefined
                          && otherCollider.layer !== undefined;
        if (useLayers && !layers[this.layer].has(otherCollider.layer)) return;
        const objectPos = object.getComponent(Transform).position;
        const objectShape = object.getComponent(Collider).shape;
        if (this.gameObject !== object) {
          let shapeArr;
          if (this.shape.constructor.name > objectShape.constructor.name) {
            shapeArr = [{pos: objectPos, shape: objectShape}, {pos: newPos, shape: this.shape}]
          } else {
            shapeArr = [{pos: newPos, shape: this.shape}, {pos: objectPos, shape: objectShape}]
          }
          if (this.checkTypeCollision(...shapeArr)) collidedWith = object;
        }
      }
    );
    return collidedWith;
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
  }

  rectRectCollision(shape1, shape2) {
    return shape1.pos.x < shape2.pos.x + shape2.shape.width &&
      shape1.pos.x + shape1.shape.width > shape2.pos.x &&
      shape1.pos.y < shape2.pos.y + shape2.shape.height &&
      shape1.pos.y + shape1.shape.height > shape2.pos.y
  }

  circleCircleCollision(shape1, shape2) {
    let dx = shape1.pos.x - shape2.pos.x;
    let dy = shape1.pos.y - shape2.pos.y;
    let distance = Math.sqrt(dx ** 2 + dy ** 2);
    return distance < shape1.shape.radius + shape2.shape.radius;
  }

  circleRectCollision(circle, rect) {
    let cx = Math.abs(circle.pos.x - rect.pos.x - rect.shape.width/2);
    let xDist = rect.shape.width/2 + circle.shape.radius;
    if (cx > xDist)
        return false;
    let cy = Math.abs(circle.pos.y - rect.pos.y - rect.shape.height/2);
    let yDist = rect.shape.height/2 + circle.shape.radius;
    if (cy > yDist)
        return false;
    if (cx <= rect.shape.width/2 || cy <= rect.shape.height/2)
        return true;
    let xCornerDist = cx - rect.shape.width/2;
    let yCornerDist = cy - rect.shape.height/2;
    let xCornerDistSq = xCornerDist * xCornerDist;
    let yCornerDistSq = yCornerDist * yCornerDist;
    let maxCornerDistSq = circle.shape.radius * circle.shape.radius;
    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
  }
}

export default Collider;
