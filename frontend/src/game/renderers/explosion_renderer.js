import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint'
import { randomInt } from '../util';

class ExplosionRenderer extends Renderer {

  draw(ctx, offset ) {
    const transform = this.transform();
    if (transform === undefined) return;

    let multiplier = 1 ;

    // if ( hitpoint > 0 ) {
      const { x, y } = transform.position.minus(offset);
      const numSpikes = 24;
      console.log("test");

      ctx.translate(x, y);

      this.drawGas( ctx, multiplier );
      this.drawSpikes( ctx, numSpikes, multiplier);
      this.drawExplosionLines( ctx, multiplier );

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    // }
  }

  drawGas(ctx, multiplier) {

    const gradient = ctx.createRadialGradient(0, 0, 10*multiplier, 0, 0, 60*multiplier);
    gradient.addColorStop(0, "#E33523");
    gradient.addColorStop(1, "#ed807600");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 60*multiplier, 0, Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
  }

  drawSpikes( ctx, spikes, multiplier) {
    let rot = (2*Math.PI)/spikes;
    const step = rot/2;
    const innerRadius = 20*multiplier;
    const outerRadius = 40*multiplier;

    ctx.beginPath();

    let [x, y, x1, y1, x2, y2] = [0, 0, 0, 0, 0, 0];

    for ( let i=0; i <= spikes; i++ ) {
      x1 = x+Math.cos(rot)*innerRadius;
      y1 = y+Math.sin(rot)*innerRadius;
      ctx.lineTo( x1, y1 );
      rot+=step;

      x2 = x+Math.cos(rot)*outerRadius;
      y2 = y+Math.sin(rot)*outerRadius;
      ctx.lineTo( x2, y2);
      rot+=step;
    }

    ctx.closePath();
    ctx.fillStyle = '#E3352355';
    ctx.fill();

  }

  drawExplosionLines(ctx, multiplier) {

  }

}

export default ExplosionRenderer;
