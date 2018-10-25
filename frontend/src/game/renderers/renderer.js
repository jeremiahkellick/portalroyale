import Component from '../component';

class Renderer extends Component {
  draw(ctx, transform) {
    ctx.beginPath();
    ctx.arc(
      transform.position.x,
      transform.position.y,
      32,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = 'deeppink';
    ctx.fill();
  }
}

export default Renderer;
