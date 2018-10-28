import Component from './component';
import Vector from '../vector';
import key from 'keymaster';
import Transform from './transform';
import Camera from './camera';

const getMouseCanvasPosition = (canvas, mouseX, mouseY) => {
  const rect = canvas.getBoundingClientRect();
  return new Vector(mouseX - rect.left, mouseY - rect.top).plus(
    Camera.camera.offset()
  );
}

class Input extends Component {
  constructor() {
    super();
    this.mouseWasClicked = false;
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.canvas = document.getElementById('canvas');
    this.canvas.addEventListener('mousedown', this.handleClick);
    this.canvas.addEventListener('mousemove', this.handleMove);
  }

  start() {
    this.transform = this.gameObject.getComponent(Transform);
  }

  handleClick(e) {
    e.preventDefault();
    this.mouseWasClicked = true;
  }

  handleMove(e) {
    e.preventDefault();
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  mousePosition() {
    return getMouseCanvasPosition(this.canvas, this.mouseX, this.mouseY);
  }

  onDestroy() {
    this.canvas.removeEventListener('mousedown', this.handleClick);
    this.canvas.removeEventListener('mousemove', this.handleMove);
  }

  getMovement() {
    const movement = Vector.zero();
    if (key.isPressed('W')) movement.y -= 1;
    if (key.isPressed('A')) movement.x -= 1;
    if (key.isPressed('S')) movement.y += 1;
    if (key.isPressed('D')) movement.x += 1;
    return movement.normalized();
  }

  activatePortal() {
    return key.isPressed('space');
  }

  getItemPickup() {
    if (key.isPressed('F')) return 'pickup';
    return null;
  }

  getItemUsed() {
    let itemUsed;
    if (key.isPressed('1')) itemUsed = 'medKit';
    return itemUsed;
  }

  shouldShoot() {
    const returnVal = this.mouseWasClicked;
    this.mouseWasClicked = false;
    return returnVal;
  }
}

export default Input;
