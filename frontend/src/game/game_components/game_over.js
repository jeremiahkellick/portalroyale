import Component from './component';
import Game from '../game';
import Hitpoint from './hitpoint';

class GameOver extends Component {

  start() {
    this.hitpoint = this.requireComponent(Hitpoint);
    this.hitpoint.onDeath( () => Game.game.endGame() );
  }

}

export default GameOver;