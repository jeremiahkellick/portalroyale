import Renderer from './renderer'; 
import Movement from '../movement';

class BulletRenderer extends Renderer {

  constructor(rotation) {
    super(); 
    this.rotation = rotation; 
  }
  draw(ctx, transform, offset) {

    const { x, y } = transform.position.minus(offset); 

    const stretch = 150; 
    const rotation = this.rotation; 

    ctx.translate(x, y); 
    // ctx.rotate(rotation); 
    ctx.beginPath();
    ctx.moveTo(0, 0); 
    
    
    let gradient = ctx.createLinearGradient(-stretch, 0, 0, 0); 
    gradient.addColorStop(0, "#fce5cd00"); 
    gradient.addColorStop(1, "#fce5cdff");

    ctx.fillStyle = gradient; 
    ctx.strokeStyle = "#00000000"; 
    ctx.lineWidth = 0; 

    ctx.fillRect(-stretch, 0, stretch, 3); 
    ctx.closePath(); 

    // ctx.rotate(-rotation); 
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
  }

}
export default BulletRenderer; 