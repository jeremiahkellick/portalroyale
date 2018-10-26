import Renderer from './renderer';
import Count from '../game_components/count';

class PlayersAliveRenderer extends Renderer {
  draw(ctx) {
    const canvas = document.getElementById("canvas");
    ctx.fillStyle = '#61726177';
    this.drawRoundedRect(
      ctx,
      canvas.width - 110,
      10,
      100,
      100,
      10
    )
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textBaseline='middle';
    ctx.font = 'bold 24px Roboto';
    ctx.fillText(Count.get('players'), canvas.width - 60, 44);
    ctx.fillText('Alive', canvas.width - 60, 76);
    ctx.font = 'bold 16px Roboto';
    ctx.textBaseline='alphabetic';
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

export default PlayersAliveRenderer;
