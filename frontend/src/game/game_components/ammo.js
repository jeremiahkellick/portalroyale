import Component from './component';

const RELOAD_DURATION = 1500;

class Ammo extends Component {
  constructor(clipSize) {
    super();
    this.clipSize = clipSize;
    this.loaded = clipSize;
    this.reloadStartTime = undefined;
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

  reload() {
    if (!this.reloading()) this.reloadStartTime = new Date();
  }

  update() {
    if (this.reloading()
        && new Date() - this.reloadStartTime >= RELOAD_DURATION) {

      this.loaded = this.clipSize;
      this.reloadStartTime = undefined;
    }
  }
}

export default Ammo;
