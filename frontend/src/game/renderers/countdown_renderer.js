import Renderer from './renderer';
import Inventory from '../game_components/inventory';

class countdownRenderer extends Renderer {
  draw(ctx) {
    const inventory = this.gameObject.getComponent(Inventory);
    if (inventory === undefined || inventory.usingItem === '') return;

    const canvas = document.getElementById("canvas");
    ctx.fillStyle = '#61726177';
    this.drawRoundedRect(
      ctx,
      canvas.width * 0.5-50,
      canvas.height * 0.4-20,
      100,
      40,
      10
    )
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textBaseline='middle';
    ctx.font = 'bold 24px Roboto';
    ctx.textAlign = "center";
    let timerString = inventory.timer < 10 ? '0' + inventory.timer.toString() : inventory.timer.toString();
    ctx.fillText('Healing', canvas.width * 0.5, canvas.height * 0.4);
    ctx.textBaseline='alphabetic';


    ctx.beginPath();
    ctx.strokeStyle='white';
    ctx.lineWidth=4;
    ctx.arc(canvas.width*0.5, canvas.height*0.3, 35, -Math.PI/2, (-inventory.timer/25 - 0.5)*Math.PI);
    ctx.fillText(timerString[0]+'.'+timerString[1], canvas.width * 0.5, canvas.height * 0.3+8);
    ctx.stroke();
    ctx.closePath();
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

export default countdownRenderer;
