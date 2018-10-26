import Component from './component';
import Hitpoint from './hitpoint';
import Input from './input';
import Speed from './speed';

class Inventory extends Component {
  constructor() {
    super();
    this.inventory = {
      'medKit': 0
    }
    this.usedItemTime = null;
    this.usingItem = '';
    this.timer = 0;
  }
  
  start() {
    this.input = this.gameObject.getComponent(Input);
    this.speed = this.gameObject.getComponent(Speed);
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
      if (item && this.hasItem(item) && (!this.usedItemTime || newTime - this.usedItemTime > 1000)) {
        this.usedItemTime = newTime+5000;
        this.speed.setSlowedSpeed();
        this.usingItem = 'Healing';
        this.timer = 50;
        let counter = setInterval(() => {
          this.timer -= 1;
        }, 100);
        setTimeout (() => {
          clearInterval(counter);
          this.speed.setRegularSpeed();
          this.useItem(item);
          this.removeItem(item);
          this.usingItem = '';
          this.usedItemTime = new Date();
        }, 5000);
      }
    }
  }
}

export default Inventory;
