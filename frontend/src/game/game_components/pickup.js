import Component from './component';
import Input from './input';
import Transform from './transform';
import Item from './item';
import Inventory from './inventory';
import Game from '../game';
import MedKitRenderer from '../renderers/med_kit_renderer'

class Pickup extends Component {
  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
  }

  update() {
    if (this.input && this.input.getItemPickup()) {
      const pos = this.transform.position;
      Object.values(Game.game.gameObjects).forEach( obj => {
        const item = obj.getComponent(Item);
        if (item === undefined) return;
        if (item.itemInRange(pos)) {
          if (obj.getComponent(MedKitRenderer)) {
            const inventory = this.gameObject.getComponent(Inventory);
            if (inventory) {
              inventory.addItem('medKit');
              item.destroy();
            }
          }
        }
      })
    }
  }
}

export default Pickup;
