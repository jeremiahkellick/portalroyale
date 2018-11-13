import Component from './component';
import Hitpoint from './hitpoint';
import Game from '../game';

class KillCounter extends Component {
  start() {
    this.requireComponent(Hitpoint).onLocalDeath(() => {
      Game.game.stats.kills += 1;
      console.log(Game.game.stats.kills);
    });
  }
}

export default KillCounter;
