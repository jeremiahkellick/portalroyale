import Component from '../component';
import Transform from '../transform';
import Renderer from './renderer';
import Hitpoint from '../hitpoint';

class HitpointRenderer extends Renderer {

  draw(ctx, transform, offset) {

    const hitpoint = transform.gameObject.getComponent(Hitpoint);
    console.log(hitpoint);
    
    let multiplier = (hitpoint ? hitpoint.health/100 : 1)

    const width = 250;
    const height = 20;
    const x = 25;
    const y = 25;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect( x, y, x + width, y + height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect( x, y, x + (width * multiplier), y + height);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.closePath(); 
  }
}

export default HitpointRenderer;
