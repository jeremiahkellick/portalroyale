import Component from './component';
import Game from '../game';
import Hitpoint from './hitpoint';

class GameOver extends Component {

  start() {
    this.hitpoint = this.requireComponent(Hitpoint);
    this.hitpoint.onDeath(senderName => {
      if (senderName) Game.game.stats.killedBy = senderName;
      Game.game.endGame();
    });
  }

}

export default GameOver;