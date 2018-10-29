import { MAP_WIDTH, MAP_HEIGHT } from '../util';
import Game from '../game';
import Component from './component';
import Transform from '../game_components/transform';
import Renderer from '../renderers/renderer';
import Vector from '../vector';

class Camera extends Component {
  constructor() {
    super();
    Camera.camera = this;
  }

  onDestroy() {
    if (Camera.camera === this) Camera.camera = undefined;
  }

  transform() {
    this.transformRef = this.transformRef
                        || this.gameObject.getComponent(Transform);
    return this.transformRef;
  }

  offset() {
    const canvas = document.getElementById("canvas");
    const [ CANVAS_WIDTH, CANVAS_HEIGHT ] = [ canvas.width, canvas.height];

    const transform = this.transform();
    if (transform === undefined) return;

    const offset = transform.position.minus(
      new Vector(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
    );

    if (offset.x <= 0) {
      offset.x = 0;
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
    return offset;
  }

  draw(ctx) {
    if (this.transform() === undefined) return;

    const canvas = document.getElementById("canvas");

    const offset = this.offset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw map grid
    this.drawGridlines(ctx, offset);

    const gameObjects = Object.values(Game.game.gameObjects);

    let objRenderers = [];
    gameObjects.forEach( obj => {
      const renderers = obj.getComponents(Renderer);
      renderers.forEach( renderer => {
        if (renderer !== undefined) objRenderers.push(renderer);
      });
    });

    objRenderers = objRenderers.sort((a, b) => a.sort - b.sort);

    objRenderers.forEach(renderer => {
      renderer.draw(ctx, offset);
    });

  }

  drawGridlines(ctx, offset) {
    const gridSize = 300;

    ctx.strokeStyle = "#6c953e";
    ctx.lineWidth = 1;
    ctx.beginPath();

    for ( let i = 0; i <= MAP_WIDTH; i+=gridSize) {
      ctx.moveTo(i-offset.x, 0);
      ctx.lineTo(i-offset.x, MAP_HEIGHT);
      ctx.stroke();
    }
    for ( let i = 0; i <= MAP_HEIGHT; i+=gridSize ) {
      ctx.moveTo(0, i-offset.y);
      ctx.lineTo(MAP_WIDTH, i-offset.y);
      ctx.stroke();
    }
    ctx.closePath();
  }
}

Camera.camera = null;

export default Camera;
