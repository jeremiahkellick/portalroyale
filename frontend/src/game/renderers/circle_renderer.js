import Renderer from './renderer';

class CircleRenderer extends Renderer {
  constructor(radius, fillColor, stroke, strokeColor, sort) {
    super();
    this.radius = radius;
    this.fillColor = fillColor;
    this.stroke = stroke;
    this.strokeColor = strokeColor;
    this.sort = sort || 0;
  }

  draw(ctx, transform, offset ) {
    const { x, y } = transform.position.minus(offset);

    ctx.beginPath();
    ctx.arc( x, y, this.radius, 0, Math.PI*2, true );
    if (this.stroke !== undefined) {
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.stroke;
      ctx.stroke();
    }
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.closePath();
  }
}

export default CircleRenderer;
