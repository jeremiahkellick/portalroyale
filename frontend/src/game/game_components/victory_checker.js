import Component from './component';
import Count from './count';
import Game from '../game';

class VictoryChecker extends Component {
  constructor() {
    super();
    this.unsubscribe = Count.onDecrease('players', count => {
      if (count === 1 && Game.game && !Game.game.over) Game.game.win();
    });
  }

  onDestroy() {
    this.unsubscribe();
  }
}

export default VictoryChecker;
