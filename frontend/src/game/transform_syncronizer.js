import Syncronizer from './syncronizer';
import Vector from './vector';

class TransformSyncronizer extends Syncronizer {
  constructor(id, component, owned = false) {
    super(id, component, owned);
    this.lerpStart = null;
    this.lerpEnd = null;
    this.positionReceiveAt = null;
  }

  update() {
    if (!this.owned) {
      if (this.lerpStart !== null) {
        this.component.position = Vector.lerp(
          this.lerpStart,
          this.lerpEnd,
          (new Date() - this.positionReceiveAt) / 100
        )
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
    this.positionReceiveAt = new Date();
    this.component.rotation = data.rotation;
  }
}

export default TransformSyncronizer;
