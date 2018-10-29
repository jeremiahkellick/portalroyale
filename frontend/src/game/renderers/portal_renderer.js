import Renderer from './renderer';
import Movement from '../game_components/movement';
import Transform from '../game_components/transform';

class PortalRenderer extends Renderer {
  draw(ctx, offset ) {
    const transforms = this.gameObject.getComponents(Transform);

    if (transforms.length === 0) return;

    const movement = this.gameObject.getComponent(Movement);
    const radius = movement.radius ;
    const alpha = radius / 60;
    const rotation = radius / Math.PI;
    if ( radius > 0 ) {
      transforms.forEach( transform => {
        const { x, y } = transform.position.minus(offset);
        ctx.translate(x, y);
        ctx.rotate(-rotation);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        this.drawSpiral(ctx, radius);
        this.drawCircle(ctx, radius);
        ctx.closePath();
        ctx.globalAlpha = 1;
        ctx.rotate(rotation);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });
    }
  }

  drawCircle(ctx, radius) {
    const gradient = ctx.createRadialGradient(0, 0, radius*.1, 0, 0, radius);
    gradient.addColorStop(.2, "#e5fdffee");
    gradient.addColorStop(.5, "#e5fdff55");
    gradient.addColorStop(.8, "#e5fdff22");
    gradient.addColorStop(1, "#e5fdff00");
    ctx.fillStyle = gradient;
    ctx.arc( 0, 0, radius, 0, Math.PI*2, false);
    ctx.fill();
  }

  drawSpiral(ctx, radius) {
    let rot = 0;
    ctx.fillStyle = "#84f4ff";

    const n = 6;
    const step = (2*Math.PI)/n;
    for ( let i = 0; i <= n; i++ ) {

      ctx.moveTo(0, 0);
      let x1, y1, x2, y2;
      x1 = Math.cos(rot-(Math.PI/4))*(radius/1.5);
      y1 = Math.sin(rot-(Math.PI/4))*(radius/1.5);

      x2 = Math.cos(rot+(Math.PI/8))*radius;
      y2 = Math.sin(rot+(Math.PI/8))*radius;

      ctx.quadraticCurveTo( x1, y1, x2, y2 );


      x1 = Math.cos(rot-(Math.PI/8))*(radius/2);
      y1 = Math.sin(rot-(Math.PI/8))*(radius/2);
      ctx.quadraticCurveTo( x1, y1, 0, 0 );

      ctx.fill();
      rot+= step;
    }

  }

}

export default PortalRenderer;
