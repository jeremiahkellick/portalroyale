import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint'

class ExplosiveCircleRenderer extends Renderer {

  draw(ctx, offset ) {
    const transform = this.transform();
    if (transform === undefined) return;
    
    const hitpoint = this.gameObject.getComponent(Hitpoint);
    let multiplier;
    if (hitpoint) {
      multiplier = (hitpoint.health === 0 ? 0 : hitpoint.health/hitpoint.maxHealth * 0.3 + 0.7);
    } else {
      multiplier = 1;
    }

    const { x, y } = transform.position.minus(offset);

    ctx.beginPath();
    ctx.arc( x, y, 30*multiplier, 0, Math.PI*2, true );
    ctx.fillStyle = '#858388';
    ctx.fill();
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 4*multiplier;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc( x, y, 23*multiplier, 0, Math.PI*2, true );
    ctx.fillStyle = '#626262';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc( x-(7*multiplier), y-(7*multiplier), 5*multiplier, 0, Math.PI*2, true );
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
  }
}

export default ExplosiveCircleRenderer;
