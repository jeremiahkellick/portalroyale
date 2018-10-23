import { CANVAS_WIDTH, CANVAS_HEIGHT } from './util'; 
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
    const [ width, height ] = [ 2500, 2500 ];   

    let translateX = x - ( CANVAS_WIDTH / 2 ); 
    let translateY = y - ( CANVAS_HEIGHT / 2 ); 
    
    // // check for top left corner
    // if ( translateX <= 0) {
    //   translateX = 0; 
    // }
    // if ( translateX <= 0 ) {
    //   translateY = 0; 
    // }
    // // check for bottom right corner
    // if ( width - x <= CANVAS_WIDTH ) {
    //   translateX = width - CANVAS_WIDTH; 
    // }
    // if ( height - y <= CANVAS_HEIGHT ) {
    //   translateY = height - CANVAS_HEIGHT; 
    // }
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
    // ctx.translate(translateX, translateY); 
    // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
    
    const gameObjects = Object.values(Game.game.gameObjects); 
  
    gameObjects.forEach( obj => {
      //render background /other objects in game
      const renderer = obj.getComponent(Renderer);
      const transform = obj.getComponent(Transform); 
      if (renderer !== undefined) {
        // console.log(renderer); 
        renderer.draw(ctx, transform, new Vector(translateX, translateY));
      }

    }); 

    // ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  

  
}

export default Camera; 