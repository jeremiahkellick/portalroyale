import Component from './component';
import Count from './count';
import Game from '../game';

class VictoryChecker extends Component {
  constructor() {
    super();
    Count.onDecrease('players', count => {
      if (count === 1 && !this.gameObject.destroyed) Game.game.win();
    });
  }
}

export default VictoryChecker;
