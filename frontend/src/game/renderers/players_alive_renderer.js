import Renderer from './renderer';
import ObjectTracker from '../game_components/object_tracker';

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
    ctx.fillText(
      Object.keys(ObjectTracker.get('players')).length,
      canvas.width - 60,
      44
    );
    ctx.fillText('Alive', canvas.width - 60, 76);
    ctx.textBaseline='alphabetic';
  }

}

export default PlayersAliveRenderer;
