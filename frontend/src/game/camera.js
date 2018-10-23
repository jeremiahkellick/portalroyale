import { CANVAS_WIDTH, CANVAS_HEIGHT } from './util'; 
// import { Vecntor }

class Camera {
  constructor(playerTransform, map) {
    this.playerTransform = playerTransform; 
    this.map = map; 
  }

  update(ctx) {
    const { x,  y} = this.playerTransform.position;  
    const { width, height } = this.map;   

    let translateX = x + ( CANVAS_WIDTH / 2 ); 
    let translateY = y + ( CANVAS_HEIGHT / 2 ); 
    
    // check for top left corner
    if ( x <= CANVAS_WIDTH ) {
      translateX = 0; 
    }
    if ( y <= CANVAS_HEIGHT ) {
      translateY = 0; 
    }
    // check for bottom right corner
    if ( width - x <= CANVAS_WIDTH ) {
      translateX = width - CANVAS_WIDTH; 
    }
    if ( height - y <= CANVAS_HEIGHT ) {
      translateY = height - CANVAS_HEIGHT; 
    }
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
    ctx.translate(translateX, translateY); 

    // render background /other objects in game

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

}

export default Camera; 