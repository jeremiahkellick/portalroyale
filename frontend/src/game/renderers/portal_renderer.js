import Renderer from './renderer';
import Movement from '../game_components/movement';
import Transform from '../game_components/transform';

class PortalRenderer extends Renderer {

  constructor(sort) {
    super(sort);
  }

  draw(ctx, offset ) {
    const transforms = this.gameObject.getComponents(Transform);

    if (transforms.length === 0) return;

    const movement = this.gameObject.getComponent(Movement);
    const radius = movement.radius;

    if ( radius > 0 ) {
      transforms.forEach( transform => {
        const { x, y } = transform.position.minus(offset);

        ctx.beginPath();
        ctx.arc( x, y, radius, 0, Math.PI*2, false);
        ctx.closePath();

        ctx.fillStyle = "#000000cc";
        ctx.fill();

      });
    }

  }

}

export default PortalRenderer;
