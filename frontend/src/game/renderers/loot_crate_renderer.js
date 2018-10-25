import Renderer from './renderer';
import Hitpoint from '../hitpoint'

class LootCrateRenderer extends Renderer {
  
  draw(ctx, transform, offset ) {

    const hitpoint = transform.gameObject.getComponent(Hitpoint);
    let m;
    if (hitpoint) {
      m = (hitpoint.health === 0 ? 0 : hitpoint.health/100 * 0.5 + 0.5);
    } else {
      m = 1;
    }

    const { x, y } = transform.position.minus(offset);

    this.drawRectangle(ctx, transform, offset, x, y, m, 100, 100, '#613200');
    this.drawRectangle(ctx, transform, offset, x+15, y+15, m, 70, 70, '#312004');
    const [ w, h ] = [ 70, 70];
    if (m !== 0) {
      ctx.beginPath();
      ctx.fillStyle = '#632A00';
      ctx.moveTo(x+30+(w-w*m)/2, y+15+(h-h*m)/2);
      ctx.lineTo(x+15+(w+w*m)/2, y+(h+h*m)/2);
      ctx.lineTo(x+15+(w+w*m)/2, y+15+(h+h*m)/2);
      ctx.lineTo(x+(w+w*m)/2, y+15+(h+h*m)/2);
      ctx.lineTo(x+15+(w-w*m)/2, y+30+(h-h*m)/2);
      ctx.lineTo(x+15+(w-w*m)/2, y+15+(h-h*m)/2);
      ctx.lineTo(x+30+(w-w*m)/2, y+15+(h-h*m)/2);
      ctx.fill();
      ctx.strokeStyle = '#000000'; 
      ctx.lineWidth = 4*m;
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = '#632A00';
      ctx.moveTo(x+(w+w*m)/2, y+15+(h-h*m)/2);
      ctx.lineTo(x+15+(w+w*m)/2, y+15+(h-h*m)/2);
      ctx.lineTo(x+15+(w+w*m)/2, y+30+(h-h*m)/2);
      ctx.lineTo(x+30+(w-w*m)/2, y+15+(h+h*m)/2);
      ctx.lineTo(x+15+(w-w*m)/2, y+15+(h+h*m)/2);
      ctx.lineTo(x+15+(w-w*m)/2, y+(h+h*m)/2);
      ctx.lineTo(x+(w+w*m)/2, y+15+(h-h*m)/2);
      ctx.fill();
      ctx.strokeStyle = '#000000'; 
      ctx.lineWidth = 4*m;
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawRectangle(ctx, transform, offset, x, y, m, w, h, fillStyle) {
    ctx.beginPath();
    ctx.rect( x + ((w - w*m) / 2), y + ((h - h*m) / 2), w*m, h*m);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = '#000000'; 
    ctx.lineWidth = 4*m;
    ctx.stroke();
    ctx.closePath();
  }
}

export default LootCrateRenderer;
