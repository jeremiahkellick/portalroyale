import Component from './component';
import Input from './input';
import Transform from './transform';
import Game from './game';

class Shoot extends Component {

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
  }

  update() {
    if (this.input) {
      if ( this.input.shouldShoot()) {
        const dir = this.input.shootPosition()
                              .minus(this.transform.position)
                              .normalized();
        let options = {
          type: "bullet",
          position: this.transform.position.plus(dir.times(30)).toPOJO(),
          directionVector: dir.toPOJO()
        };
        Game.game.sendCreateToServer( options, true );
      }
    }
  }
}

export default Shoot;
