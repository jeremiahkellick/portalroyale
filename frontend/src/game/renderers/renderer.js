import Component from '../game_components/component';
import Transform from '../game_components/transform';

class Renderer extends Component {
  constructor(sort) {
    super();
    this.sort = sort || 0;
  }

  transform() {
    this.transformRef = this.transformRef
                        || this.gameObject.getComponent(Transform);
    return this.transformRef;
  }

  draw(ctx) {
    const transform = this.transform();
    if (transform === undefined) return;

    ctx.beginPath();
    ctx.arc(
      transform.position.x,
      transform.position.y,
      32,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = 'deeppink';
    ctx.fill();
  }

  drawRoundedRect(ctx, x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x+width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
  }
}

export default Renderer;
