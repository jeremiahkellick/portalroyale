import Renderer from './renderer';
import Inventory from '../game_components/inventory';
import Ammo from '../game_components/ammo';

class countdownRenderer extends Renderer {
  draw(ctx) {
    const inventory = this.gameObject.getComponent(Inventory);
    const ammo = this.gameObject.getComponent(Ammo);
    let timer, timerStart, text;


    if (inventory && inventory.applyingItem()) {
      timer = inventory.timer;
      timerStart = 50;
      text = 'Healing'
    } else if (ammo && ammo.reloading()) {
      timer = ammo.reloadTimer;
      timerStart = 20;
      text = 'Reloading'
    } else {
      return;
    }

    const canvas = document.getElementById("canvas");
    let timerString = timer < 10 ? '0' + timer.toString() : timer.toString();

    ctx.fillStyle = '#61726177';
    this.drawRoundedRect(
      ctx,
      canvas.width * 0.5-65,
      canvas.height * 0.4-20,
      130,
      40,
      10
    )
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textBaseline='middle';
    ctx.font = 'bold 24px Roboto';
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width * 0.5, canvas.height * 0.4);
    ctx.textBaseline='alphabetic';

    ctx.beginPath();
    ctx.arc(canvas.width*0.5, canvas.height*0.3-10, 35, 0, Math.PI*2);
    ctx.fillStyle = '#61726177';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(canvas.width*0.5, canvas.height*0.3-10, 35, -Math.PI/2, (-timer/(timerStart/2) - 0.5)*Math.PI);
    ctx.strokeStyle='white';
    ctx.lineWidth=4;
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fillText(timerString[0]+'.'+timerString[1], canvas.width * 0.5, canvas.height * 0.3-2);
    ctx.closePath();
  }
}

export default countdownRenderer;
