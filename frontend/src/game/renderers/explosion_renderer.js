import Renderer from './renderer';
import Movement from '../game_components/movement';
import { randomInt, randomFloat } from '../util';

class ExplosionRenderer extends Renderer {

  draw(ctx, offset ) {
    const transform = this.transform();
    if (transform === undefined) return;

    let multiplier = 1 ;
    const movement = this.gameObject.getComponent(Movement);

    multiplier = movement.radius/50;

    const { x, y } = transform.position.minus(offset);
    const numSpikes = 24;

    ctx.translate(x, y);

    this.drawGas( ctx, multiplier );
    this.drawSpikes( ctx, numSpikes, multiplier);
    this.drawExplosionLines( ctx, multiplier, 12 );

    ctx.setTransform(1, 0, 0, 1, 0, 0);

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

    let [ x1, y1, x2, y2] = [0, 0, 0, 0];

    for ( let i=0; i <= spikes; i++ ) {
      x1 = Math.cos(rot)*innerRadius;
      y1 = Math.sin(rot)*innerRadius;
      ctx.lineTo( x1, y1 );
      rot+=step;

      x2 = Math.cos(rot)*outerRadius;
      y2 = Math.sin(rot)*outerRadius;
      ctx.lineTo( x2, y2);
      rot+=step;
    }

    ctx.closePath();
    ctx.fillStyle = '#E3352355';
    ctx.fill();

  }

  drawExplosionLines(ctx, multiplier, numLines ) {
    let rot = 0;
    const evenSlice =  Math.PI*2 / numLines;
    let left = Math.PI*2;

    let [x1, y1, x2, y2] = [0, 0, 0, 0, 0, 0];
    ctx.beginPath();
    while ( left > 0 ) {
      const innerRadius = randomInt(10*multiplier, 40*multiplier);
      const outerRadius = randomInt(20*multiplier, 70*multiplier);

      x1 = Math.cos(rot)*innerRadius;
      y1 = Math.sin(rot)*innerRadius;
      x2 = Math.cos(rot)*outerRadius;
      y2 = Math.sin(rot)*outerRadius;

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = 1;
      ctx.strokeStye = "#00000055";
      ctx.stroke();
      const step = randomFloat( evenSlice/2 , evenSlice*2 ) ;
      rot += step;
      left -= step;

    }

    ctx.closePath();
  }

}

export default ExplosionRenderer;
