import { MAP_HEIGHT, MAP_WIDTH } from '../util'; 

class GridlineRenderer extends Renderer {
  constructor(stroke, strokeColor) {
    super();
    this.stroke = stroke;
    this.strokeColor = strokeColor;
  }

  draw(ctx, transform, offset ) {
    const { x, y } = transform.position.minus(offset);
    
    ctx.beginPath();
    ctx.lineTo()
    ctx.stroke(); 
    ctx.closePath();
  }
}

export default GridlineRenderer;
