import Component from '../component';
import Transform from '../transform';

class Renderer extends Component {
  start() {
    this.transform = this.requireComponent(Transform);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.transform.position.x,
      this.transform.position.y,
      32,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = 'deeppink';
    ctx.fill();
  }
}

export default Renderer;
