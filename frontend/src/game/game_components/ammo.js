import Component from './component';
import Input from './input';
import Inventory from './inventory';

const RELOAD_DURATION = 2000;

class Ammo extends Component {
  constructor(clipSize) {
    super();
    this.clipSize = clipSize;
    this.loaded = clipSize;
    this.reloadStartTime = undefined;
    this.reloadTimer = RELOAD_DURATION/100;
  }

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.inventory = this.gameObject.getComponent(Inventory);
  }

  emptyClip() {
    return this.loaded === 0;
  }

  fullClip() {
    return this.loaded === this.clipSize;
  }

  reloading() {
    return this.reloadStartTime !== undefined;
  }

  use() {
    if (this.loaded > 0) {
      this.loaded -= 1;
      return true;
    } else {
      return false;
    }
  }

  startReload() {
    this.reloadStartTime = new Date();
    let counter = setInterval(() => {
      this.reloadTimer -= 1;
    }, 100);
    setTimeout (() => {
      clearInterval(counter);
      this.finishReload();
    }, RELOAD_DURATION);
  }

  finishReload() {
    this.loaded = this.clipSize;
    this.reloadStartTime = undefined;
    this.reloadTimer = RELOAD_DURATION/100;
  }

  update() {
    if ((this.emptyClip() || (this.input.getReload() && !this.fullClip())) 
        && !this.reloading() 
        && !this.inventory.applyingItem()) {
      this.startReload();
    }
  }
}

export default Ammo;
