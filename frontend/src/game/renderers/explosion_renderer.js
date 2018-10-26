import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint'

class ExplosionRenderer extends Renderer {

  draw(ctx, offset ) {
    const transform = this.transform();
    if (transform === undefined) return;

    const hitpoint = this.gameObject.getComponent(Hitpoint);
    // let multiplier;
    // if (hitpoint) {
    //   multiplier = (hitpoint.health === 0 ? 0 : hitpoint.health/100 * 0.3 + 0.7);
    // } else {
    //   multiplier = 1;
    // }

    // if ( hitpoint > 0 ) {
      const { x, y } = transform.position.minus(offset);
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.arc( 0, 0, 30, 0, Math.PI*2, true);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.closePath();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    // }
  }
}

export default ExplosionRenderer;
