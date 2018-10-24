import Component from './component';
import Input from './input';
import Transform from './transform';
import Vector from '../vector'; 
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
        const dir = this.input.shootPosition()
                              .minus(this.transform.position)
                              .normalized();
                              
        console.log("direction", dir); 
        const rotation = Math.acos( dir.x ); 
        let options = {
          type: "bullet",
          position: this.transform.position.plus(dir.times(30)),
          directionVector: dir, 
          rotation 
        };
        Game.game.sendCreateToServer( options, true );
      }
    }
  }
}

export default Shoot;
