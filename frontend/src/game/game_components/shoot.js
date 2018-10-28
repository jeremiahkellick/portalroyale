import Component from './component';
import Input from './input';
import Transform from './transform';
import Ammo from './ammo';
import Inventory from './inventory';
import Camera from './camera';
import Game from '../game';

class Shoot extends Component {

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.camera = this.gameObject.getComponent(Camera);
    this.transform = this.requireComponent(Transform);
    this.inventory = this.gameObject.getComponent(Inventory);
    this.ammo = this.gameObject.getComponent(Ammo);
  }

  update() {
    if (this.input) {
      if ( this.input.shouldShoot() && !this.inventory.applyingItem() 
          && !this.ammo.emptyClip() && !this.ammo.reloading()) {
        const dir = this.input.mousePosition()
                              .minus(this.transform.position)
                              .normalized();
        const rotation = this.transform.rotation;
        this.ammo.use();
        let options = {
          type: "bullet",
          position: this.transform.position.plus(dir.times(30)).toPOJO(),
          directionVector: dir.toPOJO(),
          rotation,
          shouldSave: false
        };
        Game.game.sendCreateToServer( options, true );

        const sound = new Audio("./sounds/bullet.mp3");
        sound.play();

      }
    }
  }
}

export default Shoot;
