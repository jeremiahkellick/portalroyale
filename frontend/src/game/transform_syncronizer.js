import Syncronizer from './syncronizer';
import Vector from '../vector';

class TransformSyncronizer extends Syncronizer {
  pack() {
    return {
      position: this.component.position.toPOJO(),
      rotation: this.component.rotation
    };
  }

  unpack(data) {
    this.component.position = Vector.fromPOJO(data.position);
    this.component.rotation = data.rotation;
  }
}

export default TransformSyncronizer;
