import Component from './component';
import Input from './input';
import Transform from './transform';
import Game from './game'; 
import Vector from '../vector'; 

class Shoot extends Component {

  start() {
    this.input = this.gameObject.getComponent(Input);
    this.transform = this.requireComponent(Transform);
  }

  update() {
    if (this.input) {
      if ( this.input.shouldShoot()) {
        let options = {
          type: "bullet", 
          position: this.transform.position.plus( new Vector( 200, 0) ), 
        }
        Game.game.sendCreateToServer( options, true ); 
      } 
    }
  }
}

export default Shoot;
