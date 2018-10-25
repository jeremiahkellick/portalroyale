import Component from '../game_components/component';
import Transform from '../game_components/transform';
import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint';

class HitpointRenderer extends Renderer {

  draw(ctx, transform, offset) {

    const hitpoint = transform.gameObject.getComponent(Hitpoint);

    let multiplier = (hitpoint ? hitpoint.health/100 : 1)

    const width = 200;
    const height = 10;
    const x = 25;
    const y = 25;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect( x, y, x + width, y + height);
    ctx.fillStyle = 'gray';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect( x, y, x + (width * multiplier), y + height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();
  }
}

export default HitpointRenderer;
