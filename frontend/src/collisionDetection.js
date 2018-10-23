import Vector from '../vector';

class CollisionDetection {
  constructor(shape1, shape2) {
    this.shape1 = shape1;
    this.shape2 = shape2;
  }

  checkCollision() {
    if (this.shape1 instanceof Circle && this.shape2 instanceof Circle) {
      return this.circleCircleCollision();
    } 
    else if (this.shape1 instanceof Rectangle && this.shape2 instanceof Rectangle) {
      return this.rectRectCollision();
    }
    else if (this.shape1 instanceof Rectangle && this.shape2 instanceof Circle) {
      return this.rectCircleCollision();
    }
    else if (this.shape1 instanceof Circle && this.shape2 instanceof Line) {
      return this.circleLineCollision();
    }
    else if (this.shape1 instanceof Rectangle && this.shape2 instanceof Line) {
      return this.rectLineCollision();
    }
  }

  rectRectCollision() {
    return shape1.pos.x < shape2.pos.x + shape2.width && 
      shape1.pos.x + shape1.width > shape2.pos.x && 
      shape1.pos.y < shape2.pos.y + shape2.height && 
      shape1.pos.y + shape1.height > shape2.pos.y
  }

  circleCircleCollision() {
    let dx = shape1.pos.x - shape2.pos.x;
    let dy = shape1.pos.y - shape2.pos.y;
    let distance = Math.sqrt(dx ** 2 + dy ** 2);
    return distance < shape1.radius + shape2.radius;
  }

  circleRectCollision() {
    const rect = this.shape1;
    const circle = this.shape2;
    let rectX = rect.pos.x + rect.width/2;
    let rectY = rect.pos.y + rect.height/2;
    let circleDistanceX = abs(circle.pos.x - rectX);
    let circleDistanceY = abs(circle.pos.y - rectY);

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

  circleLineCollision() {
    const circle = this.shape1;
    const line = this.shape2;
    let AB = new Vector(line.pos2.x - line.pos1.x, line.pos2.y - line.pos1.y);
    let AC = new Vector(circle.pos.x - line.pos1.x, circle.pos.y - line.pos1.y);
    let orthogonal = AC.minus(AB.times(AC.dotProduct(AB) / AB.dotProduct(AB)));
    return orthogonal.magnitude() < circle.radius;
  }

  rectLineCollision() {
    const edgeLeft = this.shape1.pos.x;
    const edgeRight = this.shape1.pos.x + this.shape1.width;
    const edgeTop = this.shape1.pos.y + this.shape1.height;
    const edgeBottom = this.shape1.pos.y;
    const x0src = this.shape2.pos1.x;
    const x1src = this.shape2.pos2.x;
    const y0src = this.shape2.pos1.y;
    const y1src = this.shape2.pos2.y;
    
    const t0 = 0.0;
    const t1 = 1.0;
    const xdelta = x1src-x0src;
    const ydelta = y1src-y0src;
    const p,q,r;

    for(let edge=0; edge<4; edge++) {   // Traverse through left, right, bottom, top edges.
        if (edge==0) {  p = -xdelta;    q = -(edgeLeft-x0src);  }
        if (edge==1) {  p = xdelta;     q =  (edgeRight-x0src); }
        if (edge==2) {  p = -ydelta;    q = -(edgeBottom-y0src);}
        if (edge==3) {  p = ydelta;     q =  (edgeTop-y0src);   }   
        r = q/p;
        if(p==0 && q<0) return false;   // Don't draw line at all. (parallel line outside)

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
