import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint';

class HitpointRenderer extends Renderer {
  draw(ctx, offset) {
    const hitpoint = this.gameObject.getComponent(Hitpoint);

    let multiplier = (hitpoint ? hitpoint.health/hitpoint.maxHealth : 1)

    let color ;
    if ( multiplier <= .2 ) {
      color = "#FF6347cc";
    } else if ( multiplier <= .5 ) {
      color = "#FFD700cc";
    } else {
      color = "#ffffffcc";
    }

    const width = 200;
    const height = 5;
    const x = 25;
    const y = 25;
    const radius = 5;

    this.drawRoundedRect( ctx, x - 5, y - 5, x + width +10, y + height + 10, radius);
    ctx.fillStyle = '#00000055';
    ctx.fill();

    this.drawRoundedRect( ctx, x, y, x + (width * multiplier), y + height, radius-2);
    ctx.fillStyle = color;
    ctx.fill();

  }
}

export default HitpointRenderer;
