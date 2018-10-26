import Component from './component';
import Hitpoint from './hitpoint';
import Input from './input';

class Inventory extends Component {
  constructor() {
    super();
    this.inventory = {
      'medKit': 0
    }
    this.usedItemTime = null;
  }
  
  start() {
    this.input = this.gameObject.getComponent(Input);
  }

  hasItem(item) {
    return this.inventory[item] && this.inventory[item] > 0;
  }

  addItem(item) {
    this.inventory[item] += 1;
  }

  removeItem(item) {
    if (this.hasItem(item)) this.inventory[item] -= 1;
  }

  useItem(item) {
    switch(item) {
      case 'medKit':
        const health = this.gameObject.getComponent(Hitpoint);
        if (health) health.heal(100);
    }
  }

  update() {
    if (this.input) {
      const item = this.input.getItemUsed();
      const newTime = new Date();
      if (item && (!this.usedItemTime || newTime - this.usedItemTime > 1000)) {
        this.useItem(item);
        this.removeItem(item);
        this.usedItemTime = new Date();
      }
    }
  }
}

export default Inventory;
