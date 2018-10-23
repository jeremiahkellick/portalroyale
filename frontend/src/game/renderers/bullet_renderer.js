import Renderer from './renderer'; 

class BulletRenderer extends Renderer {

  draw(ctx, transform, offset ) {
 
    const { x, y } = transform.position.minus(offset); 
    // const { x1, y1 } = transform.position.

    ctx.beginPath(); 
    // ctx.moveTo(x, y); 
    let gradient = ctx.createLinearGradient(0, 0, 200, 0); 
    gradient.addColorStop(0, "#fce5cd00"); 
    gradient.addColorStop(1, "#fce5cdcc");
    ctx.fillStyle = gradient; 
    ctx.strokeStyle = "#00000000"; 
    ctx.lineWidth = 0; 

    ctx.fillRect(x, y, x+150, 5); 
    // ctx.stroke(); 
    ctx.closePath();
  }


}
export default BulletRenderer; 