import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint';

class HitpointRenderer extends Renderer {
  draw(ctx, offset) {
    const hitpoint = this.gameObject.getComponent(Hitpoint);

    let multiplier = (hitpoint ? hitpoint.health/100 : 1)

    let color ;
    if ( multiplier < .2 ) {
      color = "#FF6347cc";
    } else if ( multiplier < .5 ) {
      color = "#FFD700cc";
    } else {
      color = "#ffffffcc";
    }

    const width = 200;
    const height = 5;
    const x = 25;
    const y = 25;

    ctx.beginPath();
    ctx.rect( x, y, x + width, y + height);
    ctx.fillStyle = '#BEBEBE55';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00000022';
    ctx.stroke();
    ctx.closePath();


    ctx.beginPath();
    ctx.rect( x, y, x + (width * multiplier), y + height);
    ctx.fillStyle = color ;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00000022';
    ctx.stroke();
    ctx.closePath();
  }
}

export default HitpointRenderer;
