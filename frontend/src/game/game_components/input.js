import Component from './component';
import Vector from '../vector';
import key from 'keymaster';
import Transform from './transform';
import Camera from './camera';
import Game from '../game';

const getMouseCanvasPosition = (canvas, event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  return new Vector(event.clientX - rect.left, event.clientY - rect.top);
}

class Input extends Component {
  constructor() {
    super();
    this.mouseWasClicked = false;
    this.handleClick = this.handleClick.bind(this);
    this.canvas = document.getElementById('canvas');
    this.canvas.addEventListener('mousedown', this.handleClick);
  }

  handleClick(e) {
    e.preventDefault();
    if (Game.game.started === false) return;
    const mouseCanvasPosition = getMouseCanvasPosition(this.canvas, e)
    this.mousePosition = mouseCanvasPosition.plus(Camera.camera.offset());
    this.mouseWasClicked = true;
  }

  onDestroy() {
    this.canvas.removeEventListener('mousedown', this.handleClick);
  }

  start() {
    this.camera = Camera.camera.gameObject.getComponent(Transform);
  }

  getMovement() {
    const movement = Vector.zero();
    if (key.isPressed('W')) movement.y -= 1;
    if (key.isPressed('A')) movement.x -= 1;
    if (key.isPressed('S')) movement.y += 1;
    if (key.isPressed('D')) movement.x += 1;
    return movement.normalized();
  }

  shouldShoot() {
    const returnVal = this.mouseWasClicked;
    this.mouseWasClicked = false;
    return returnVal;
  }

  shootPosition() {
    return this.mousePosition;
  }
}

export default Input;
