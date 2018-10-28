import Renderer from './renderer';
// import ObjectTracker from '../game_components/object_tracker';
import Hitpoint from '../game_components/hitpoint';
import Inventory from '../game_components/inventory';

class MedCountRenderer extends Renderer {
  draw(ctx) {

    const inventory = this.gameObject.getComponent(Inventory);
    if (inventory.inventory["medKit"]) {
    }
    const canvas = document.getElementById("canvas");

    ctx.fillStyle = '#61726177';
    this.drawRoundedRect(
      ctx,
      canvas.width - 100,
      120,
      90,
      40,
      10
    )
    ctx.fill();


    if (inventory.inventory["medKit"]) {
      //hasMedkit
      this.drawRectangle(ctx, 0, 0, canvas.width - (54 - 0), (126 + 0), 1, 32, 28, '#ffffff', false);
      ctx.fillStyle = 'white';
      ctx.textBaseline='middle';
      ctx.font = 'bold 20px Roboto';
      ctx.textAlign = "center";
      ctx.fillText(
        inventory.inventory["medKit"],
        canvas.width - 80,
        140
      );
    } else {
      // no Medkit
      this.drawRectangle(ctx, 0, 0, canvas.width - (54 - 0), (126 + 0), 1, 32, 28, '#ffffff', true);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = 'white';
      ctx.textBaseline='middle';
      ctx.font = 'bold 20px Roboto';
      ctx.textAlign = "center";
      ctx.fillText(
        inventory.inventory["medKit"],
        canvas.width - 80,
        140
      );
      ctx.globalAlpha = 1;
    }
    this.drawRectangle(ctx, 0, 0, canvas.width - (54 - 4), (126 + 10), 1, 24, 8, '#000000', true);
    this.drawRectangle(ctx, 0, 0, canvas.width - (54 - 12), (126 + 2), 1, 8, 24, '#000000', true);



  }

  drawRectangle(ctx, transform, offset, x, y, m, w, h, fillStyle, a) {
    ctx.beginPath();
    if (a) ctx.globalAlpha = 0.5;
    ctx.rect( x + ((w - w*m) / 2), y + ((h - h*m) / 2), w*m, h*m);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    if (a) ctx.globalAlpha = 1;
    ctx.closePath();
  }
}

export default MedCountRenderer;
