import { CANVAS_WIDTH, CANVAS_HEIGHT, MAP_WIDTH, MAP_HEIGHT } from './util';
import Game from './game';
import Component from './component';
import Transform from './transform';
import Renderer from './renderers/renderer';
import Vector from '../vector';

class Camera extends Component {
  constructor() {
    super();
    Camera.camera = this;
  }

  start() {
    this.playerTransform = this.requireComponent(Transform);
  }

<<<<<<< HEAD
  update() {
    
    const ctx = Game.game.ctx; 
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); 
    
    const gameObjects = Object.values(Game.game.gameObjects)
      .sort( (a, b) => a.sort - b.sort ); 
    
    // need to dermine order 
    gameObjects.forEach( obj => {
      //render background /other objects in game
      const renderer = obj.getComponent(Renderer);
      const transform = obj.getComponent(Transform); 
      if (renderer !== undefined && transform !== undefined ) {
        renderer.draw(ctx, transform, this.getOffset() );
      }

    });
  }

  getOffset() {
  
    const { x,  y } = this.playerTransform.position;  
    const [ width, height ] = [ MAP_WIDTH, MAP_HEIGHT ];   

    let translateX = x - ( CANVAS_WIDTH / 2 ); 
    let translateY = y - ( CANVAS_HEIGHT / 2 ); 
    
    // check for top left corner
    if ( translateX <= 0) {
      translateX = 0; 
=======
  offset() {
    const offset = this.playerTransform.position.minus(
      new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
    );

    if (offset.x <= 0) {
      offset.x = 0;
>>>>>>> master
    }
    if (offset.y <= 0) {
      offset.y = 0;
    }
    if (offset.x + CANVAS_WIDTH > MAP_WIDTH) {
      offset.x = MAP_WIDTH - CANVAS_WIDTH;
    }
    if (offset.y + CANVAS_HEIGHT > MAP_HEIGHT) {
      offset.y = MAP_HEIGHT - CANVAS_HEIGHT;
    }

<<<<<<< HEAD
    return new Vector(translateX, translateY);
    
  }

  
=======
    return offset;
  }

  update() {
    const ctx = Game.game.ctx;

    const { x: translateX, y: translateY } = this.offset();

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
>>>>>>> master
}

Camera.camera = null;

export default Camera;
