import Renderer from './renderer'; 

class PlayerRenderer extends Renderer {

  draw(ctx) {
 
    const { position: { x, y } } = this.transform; 

    ctx.beginPath(); 
    ctx.arc( x, y, 50, 0, Math.PI*2, true ); 
    ctx.strokeStyle = "#fffff"; 
    ctx.lineWidth = 12; 
    ctx.stroke(); 
    ctx.fillStyle = "#fce5cdff";  
    ctx.fill(); 
    ctx.closePath();
  }


}
export default PlayerRenderer; 