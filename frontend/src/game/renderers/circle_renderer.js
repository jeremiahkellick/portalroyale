import Renderer from './renderer';

class CircleRenderer extends Renderer {
  constructor(radius, fillColor, stroke, strokeColor, sort) {
    super(sort);
    this.radius = radius;
    this.fillColor = fillColor;
    this.stroke = stroke;
    this.strokeColor = strokeColor;
    this.sort = sort || 0;
  }


  draw(ctx, offset) {
    const transform = this.transform();
    if (transform === undefined) return;

    const { x, y } = transform.position.minus(offset);
    const rotation = transform.rotation+ Math.PI/2;

    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();

    ctx.arc( 0, 0, this.radius, 0, Math.PI*2, true );
    if (this.stroke !== undefined) {
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.stroke;
      ctx.stroke();
    }

    ctx.fillStyle = this.fillColor;
    ctx.fill();

    ctx.moveTo(7, -15)
    ctx.arc( 0, -15, 7, 0, Math.PI*2, true );
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.rotate(-rotation);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default CircleRenderer;
