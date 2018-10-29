import Renderer from './renderer';

class MedKitRenderer extends Renderer {

  draw(ctx, offset) {
    const transform = this.transform();
    if (transform === undefined) return;

    const { x, y } = transform.position.minus(offset);

    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI*2, false);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    this.drawRectangle(ctx, x-16, y-14, 1, 32, 28, '#ffffff', false);
    this.drawRectangle(ctx, x-12, y-4, 1, 24, 8, '#000000', true);
    this.drawRectangle(ctx, x-4, y-12, 1, 8, 24, '#000000', true);
  }

  drawRectangle(ctx, x, y, m, w, h, fillStyle, a) {
    ctx.beginPath();
    if (a) ctx.globalAlpha = 0.5;
    ctx.rect( x + ((w - w*m) / 2), y + ((h - h*m) / 2), w*m, h*m);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    if (a) ctx.globalAlpha = 1;
    ctx.closePath();
  }
}

export default MedKitRenderer;
