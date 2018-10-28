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
    ctx.textAlign = "center";
    ctx.fillText(Count.get('players'), canvas.width - 60, 44);
    ctx.fillText('Alive', canvas.width - 60, 76);
    ctx.textBaseline='alphabetic';
  }

}

export default PlayersAliveRenderer;
