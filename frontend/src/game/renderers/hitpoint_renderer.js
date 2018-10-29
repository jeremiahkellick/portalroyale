import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint';

class HitpointRenderer extends Renderer {
  draw(ctx) {
    const hitpoint = this.gameObject.getComponent(Hitpoint);

    let multiplier = (hitpoint ? hitpoint.health/hitpoint.maxHealth : 1)
    const canvas = document.getElementById("canvas");

    let color ;
    if ( multiplier <= .2 ) {
      color = "#FF6347cc";
    } else if ( multiplier <= .5 ) {
      color = "#FFD700cc";
    } else {
      color = "#ffffffcc";
    }

    const width = 300;
    const height = 30;
    const x = canvas.width * 0.5 - 150;
    const y = canvas.height - 50;
    const radius = 5;

    this.drawRoundedRect( ctx, x - 5, y - 5, width +10, height + 10, radius);
    ctx.fillStyle = '#00000055';
    ctx.fill();

    this.drawRoundedRect( ctx, x, y, (width * multiplier), height, radius-2);
    ctx.fillStyle = color;
    ctx.fill();

  }
}

export default HitpointRenderer;
