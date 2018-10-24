import Renderer from './renderer'; 

class BulletRenderer extends Renderer {

  draw(ctx, transform, offset ) {

    const { x, y } = transform.position.minus(offset); 
    const stretch = 150; 

    ctx.beginPath(); 
    
    let gradient = ctx.createLinearGradient(x-stretch, y, x, y); 
    gradient.addColorStop(0, "#fce5cd00"); 
    gradient.addColorStop(1, "#fce5cdff");

    ctx.fillStyle = gradient; 
    ctx.strokeStyle = "#00000000"; 
    ctx.lineWidth = 0; 

    ctx.fillRect(x-stretch, y, stretch, 3); 
    ctx.closePath(); 
  }

}
export default BulletRenderer; 