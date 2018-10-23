import Renderer from './renderer'; 

class PlayerRenderer extends Renderer {

  draw(ctx, transform, offset ) {
 
    const { x, y } = transform.position.minus(offset); 

    ctx.beginPath(); 
    ctx.arc( x, y, 50, 0, Math.PI*2, true ); 
    ctx.strokeStyle = "#000000"; 
    ctx.lineWidth = 12; 
    ctx.stroke(); 
    ctx.fillStyle = "#fce5cdff";  
    ctx.fill(); 
    ctx.closePath();
  }


}
export default PlayerRenderer; 