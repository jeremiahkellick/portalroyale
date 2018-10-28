import Renderer from './renderer';
import Ammo from '../game_components/ammo';

class AmmoClipRenderer extends Renderer {
  draw(ctx) {
    const canvas = document.getElementById("canvas");
    const ammo = this.gameObject.getComponent(Ammo);
    if (ammo === undefined) return;

    ctx.fillStyle = '#61726177';
    this.drawRoundedRect(
      ctx,
      canvas.width * 0.5-35,
      canvas.height - 110,
      70,
      40,
      10
    )
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textBaseline='middle';
    ctx.font = 'bold 24px Roboto';
    ctx.textAlign = "center";
    ctx.fillText(
      ammo.loaded,
      canvas.width * 0.5, 
      canvas.height - 90
    )
    ctx.textBaseline='alphabetic';
  }

}

export default AmmoClipRenderer;
