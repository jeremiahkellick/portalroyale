import Renderer from './renderer';
import Hitpoint from '../game_components/hitpoint'

class LootCrateRenderer extends Renderer {
  
  draw(ctx, offset ) {
    const transform = this.transform();
    if (transform === undefined) return;

    const hitpoint = transform.gameObject.getComponent(Hitpoint);
    let m;
    if (hitpoint) {
      m = (hitpoint.health === 0 ? 0 : hitpoint.health/hitpoint.maxHealth * 0.5 + 0.5);
    } else {
      m = 1;
    }

    const { x, y } = transform.position.minus(offset);

    this.drawRectangle(ctx, transform, offset, x, y, m, 100, 100, '#613200');
    this.drawRectangle(ctx, transform, offset, x+15*m, y+15*m, m, 70, 70, '#312004');
    const [ w, h ] = [ 70, 70];
    if (m !== 0) {
      ctx.beginPath();
      ctx.fillStyle = '#632A00';
      ctx.moveTo(x+30*m, y+15*m);
      ctx.lineTo(x+15*m+w*m, y+h*m);
      ctx.lineTo(x+15*m+w*m, y+15*m+h*m);
      ctx.lineTo(x+w*m, y+15*m+h*m);
      ctx.lineTo(x+15*m, y+30*m);
      ctx.lineTo(x+15*m, y+15*m);
      ctx.lineTo(x+30*m, y+15*m);
      ctx.fill();
      ctx.strokeStyle = '#000000'; 
      ctx.lineWidth = 4*m;
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = '#632A00';
      ctx.moveTo(x+w*m, y+15*m);
      ctx.lineTo(x+15*m+w*m, y+15*m);
      ctx.lineTo(x+15*m+w*m, y+30*m);
      ctx.lineTo(x+30*m, y+15*m+h*m);
      ctx.lineTo(x+15*m, y+15*m+h*m);
      ctx.lineTo(x+15*m, y+h*m);
      ctx.lineTo(x+w*m, y+15*m);
      ctx.fill();
      ctx.strokeStyle = '#000000'; 
      ctx.lineWidth = 4*m;
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawRectangle(ctx, transform, offset, x, y, m, w, h, fillStyle) {
    ctx.beginPath();
    // ctx.rect( x + ((w - w*m) / 2), y + ((h - h*m) / 2), w*m, h*m);
    ctx.rect ( x, y, w*m, h*m);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 4*m;
    ctx.stroke();
    ctx.closePath();
  }
}

export default LootCrateRenderer;
