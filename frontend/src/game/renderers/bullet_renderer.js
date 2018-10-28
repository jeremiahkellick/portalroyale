import Renderer from './renderer';
import BulletMovement from '../game_components/bullet_movement';

class BulletRenderer extends Renderer {

  constructor(rotation, sort) {
    super(sort);
    this.rotation = rotation;
  }

  draw(ctx, offset) {
    const bulletMovement = this.gameObject.getComponent(BulletMovement);

    const transform = this.transform();
    if (transform === undefined) return;

    const { x, y } = transform.position.minus(offset);

    let stretch = 500;
    if (bulletMovement) {
      stretch = bulletMovement.length;
    }

    const rotation = this.rotation;

    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, 0);

    let gradient = ctx.createLinearGradient(-stretch, 0, 0, 0);
    gradient.addColorStop(0, "#fce5cd00");
    gradient.addColorStop(1, "#fce5cdff");

    ctx.fillStyle = gradient;
    ctx.strokeStyle = "#00000000";
    ctx.lineWidth = 0;

    ctx.fillRect(-stretch, -1.5, stretch, 3);
    ctx.closePath();

    ctx.rotate(-rotation);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

}
export default BulletRenderer;