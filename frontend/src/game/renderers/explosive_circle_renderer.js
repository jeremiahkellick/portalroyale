import Renderer from './renderer';
import Hitpoint from '../hitpoint'

class ExplosiveCircleRenderer extends Renderer {
  constructor(radius, fillColor, stroke, strokeColor) {
    super();
    this.radius = radius;
    this.fillColor = fillColor;
    this.stroke = stroke;
    this.strokeColor = strokeColor;
  }

  draw(ctx, transform, offset ) {

    const hitpoint = transform.gameObject.getComponent(Hitpoint);
    let multiplier;
    if (hitpoint) {
      multiplier = (hitpoint.health === 0 ? 0 : hitpoint.health/100 * 0.6 + 0.4);
    } else {
      multiplier = 1;
    }

    const { x, y } = transform.position.minus(offset);

    ctx.beginPath();
    ctx.arc( x, y, 30*multiplier, 0, Math.PI*2, true );
    ctx.fillStyle = '#858388';
    ctx.fill();
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc( x, y, 23*multiplier, 0, Math.PI*2, true );
    ctx.fillStyle = '#626262';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc( x-7, y-7, 5, 0, Math.PI*2, true );
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
  }
}

export default ExplosiveCircleRenderer;
