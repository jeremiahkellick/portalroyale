import Component from '../game_components/component';
import Transform from '../game_components/transform';

class Renderer extends Component {
  constructor(sort) {
    super();
    this.sort = sort || 0;
  }

  transform() {
    this.transformRef = this.transformRef
                        || this.gameObject.getComponent(Transform);
    return this.transformRef;
  }

  draw(ctx) {
    const transform = this.transform();
    if (transform === undefined) return;

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
