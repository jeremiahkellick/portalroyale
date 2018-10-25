import Component from '../game_components/component';

class Renderer extends Component {
  constructor(sort) {
    super();
    this.sort = sort || 0;
  }

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
