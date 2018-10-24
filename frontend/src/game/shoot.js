import Component from './component';
import Input from './input';
import Transform from './transform';
import Camera from './camera';
import Game from './game';

class Shoot extends Component {

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.camera = this.gameObject.getComponent(Camera);
    this.transform = this.requireComponent(Transform);
  }

  update() {
    if (this.input) {
      if ( this.input.shouldShoot()) {
        const shootPos = this.input.shootPosition();
        const playerPos = this.transform.position;
        const dir = shootPos.minus(playerPos).normalized();

        const sign = playerPos.y < shootPos.y ? 1 : -1
        const rotation = Math.acos( (dir.x * sign) / dir.magnitude() ) + ( sign === -1 ? Math.PI : 0 ) ;

        let options = {
          type: "bullet",
          position: this.transform.position.plus(dir.times(30)).toPOJO(),
          directionVector: dir.toPOJO(),
          rotation
        };
        Game.game.sendCreateToServer( options, true );
      }
    }
  }
}

export default Shoot;
