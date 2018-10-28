import Renderer from './renderer';

class PlayerRenderer extends Renderer {
  constructor(radius, sort) {
    super(sort);
    this.radius = radius;
    this.sort = sort || 0;
  }

  draw(ctx, offset) {
    const transform = this.transform();
    if (transform === undefined) return;

    const { x, y } = transform.position.minus(offset);
    const rotation = transform.rotation;

    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.arc( 0, 0, this.radius, 0, Math.PI*2, true );
    ctx.closePath();

    ctx.fillStyle = '#f6cb88';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();

    this.drawRoundedRect(ctx, this.radius, -3.5, 44, 7, 20);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.radius - 4, 0, 7.5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = '#f6cb88';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.radius + 18, 6, 7.5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default PlayerRenderer;
