import Syncronizer from './syncronizer';
import Vector from './vector';

class TransformSyncronizer extends Syncronizer {
  constructor(id, component, owned = false) {
    super(id, component, owned);
    this.lerpStart = null;
    this.lerpEnd = null;
    this.updateReceivedAt = null;
  }

  update() {
    if (!this.owned) {
      if (this.lerpStart !== null) {
        const factor = (new Date() - this.updateReceivedAt) / 100;
        this.component.position = Vector.lerp(
          this.lerpStart,
          this.lerpEnd,
          factor
        );
        this.component.rotation = this.lerpAngle(
          this.rotLerpStart,
          this.rotLerpEnd,
          factor
        );
      }
    }
  }

  pack() {
    return {
      position: this.component.position.toPOJO(),
      rotation: this.component.rotation
    };
  }

  unpack(data) {
    this.lerpStart = this.component.position;
    this.lerpEnd = Vector.fromPOJO(data.position);
    this.rotLerpStart = this.component.rotation;
    this.rotLerpEnd = data.rotation;
    this.updateReceivedAt = new Date();
  }

  lerpAngle(start, end, factor) {
    return this.wrapAngle(start + factor * this.wrapAngle(end - start));
  }

  wrapAngle(angle) {
    angle %= Math.PI * 2;
    if (angle > Math.PI) angle -= Math.PI * 2;
    return angle;
  }
}

export default TransformSyncronizer;
