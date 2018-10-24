import { CANVAS_WIDTH, CANVAS_HEIGHT, MAP_WIDTH, MAP_HEIGHT } from './util'; 
import Game from './game'; 
import Component from './component';
import Transform from './transform';
import Renderer from './renderers/renderer'; 
import Vector from '../vector'; 

class Camera extends Component {

  start() {
    this.playerTransform = this.requireComponent(Transform); 
  }

  update() {
    const ctx = Game.game.ctx; 
    const { x,  y } = this.playerTransform.position;  
    const [ width, height ] = [ MAP_WIDTH, MAP_HEIGHT ];   

    let translateX = x - ( CANVAS_WIDTH / 2 ); 
    let translateY = y - ( CANVAS_HEIGHT / 2 ); 
    
    // check for top left corner
    if ( translateX <= 0) {
      translateX = 0; 
    }
    if ( translateY <= 0 ) {
      translateY = 0; 
    }
    // check for bottom right corner
    if ( translateX + CANVAS_WIDTH > width ) {
      translateX = width - CANVAS_WIDTH; 
    }
    if (translateY + CANVAS_HEIGHT > height ) {
      translateY = height - CANVAS_HEIGHT; 
    }
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
    
    const gameObjects = Object.values(Game.game.gameObjects)
      .sort( (a, b) => a.sort - b.sort ); 
    
    // need to dermine order 
    gameObjects.forEach( obj => {
      //render background /other objects in game
      const renderer = obj.getComponent(Renderer);
      const transform = obj.getComponent(Transform); 
      if (renderer !== undefined && transform !== undefined ) {
        renderer.draw(ctx, transform, new Vector(translateX, translateY));
      }

    }); 

  }
  

  
}

export default Camera; 