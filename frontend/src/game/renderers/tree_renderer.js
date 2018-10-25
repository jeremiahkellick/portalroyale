import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint';

class TreeRenderer extends Renderer {
  draw(ctx, transform, offset) {
    const hitpoint = transform.gameObject.getComponent(Hitpoint);
    let multiplier;
    if (hitpoint) {
      multiplier = (hitpoint.health === 0 ? 0 : hitpoint.health/100 * 0.6 + 0.4);
    } else {
      multiplier = 1;
    }


    const BRANCH_COLOR = "#4c3012";
    const TREE_COLOR = "#42552Fee";

    this.drawSpiral(
      ctx,
      transform,
      offset,
      24,
      80 * multiplier,
      100 * multiplier,
      0,
      "#ffffff00",
      TREE_COLOR
    );

    this.drawSpiral(
      ctx,
      transform,
      offset,
      18,
      22 * multiplier,
      30 * multiplier,
      10,
      "#000000",
      BRANCH_COLOR
    );
  }

  drawSpiral( ctx, transform, offset, spikes, innerRadius, outerRadius, lineWidth, strokeStyle, fillStyle ) {

    const { x, y } = transform.position.minus(offset);

    let rot = Math.PI/(spikes/2);
    const step = Math.PI/(spikes);
    const midRadius = (innerRadius+outerRadius) / 2 ;

    ctx.beginPath();

    let [x1, y1, x2, y2] = [0, 0, 0, 0];

    for ( let i=0; i <= spikes; i++ ) {

      if ( i % 2 === 0 ) {
        x1 = x+Math.cos(rot)*innerRadius;
        y1 = y+Math.sin(rot)*innerRadius;
      } else {
        x1 = x+Math.cos(rot)*outerRadius;
        y1 = y+Math.sin(rot)*outerRadius;
      }
      rot+=step;

      x2 = x+Math.cos(rot)*midRadius;
      y2 = y+Math.sin(rot)*midRadius;
      ctx.quadraticCurveTo( x1, y1, x2, y2 );

      rot+=step;
    }
    ctx.closePath();

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

}

export default TreeRenderer;