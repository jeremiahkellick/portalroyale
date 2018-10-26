import Renderer from './renderer';

class NameRenderer extends Renderer {
  constructor(name, sort) {
    super(sort);
    this.name = name;
  }

  draw(ctx, offset) {
    const transform = this.transform();
    if(transform === undefined) return;

    const { x, y } = transform.position.minus(offset);
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.font = 'bold 16px Roboto';
    ctx.textAlign = "center";
    ctx.fillText(this.name, x, y + 36);
    ctx.shadowColor = 'transparent';
  }
}

export default NameRenderer;
