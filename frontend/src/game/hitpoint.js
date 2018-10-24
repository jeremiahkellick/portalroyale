import Component from './component';
import Input from './input';
import Transform from './transform';
import Time from './time';
import Collider from './collider';

class Hitpoint extends Component {
  constructor(health) {
    super();
    this.onDamageFunctions = [];
    this.onDeathFunctions = [];
    this.health = health;
  }

  onDamage(func) {
    this.onDamageFunctions.push(func);
  }

  onDeath(func) {
    this.onDeathFunctions.push(func);
  }

  damage(damage) {
    this.dispatch({ type: 'DAMAGE', damage });
  }

  death() {
    this.dispatch({ type: 'DEATH'});
  }

  update() {
    if (this.health === 0) {
      this.death();
    }
  }

  handleAction(action) {
    switch (action.type) {
      case 'DAMAGE':
        this.health = Math.max(this.health - action.damage, 0);
        this.onDamageFunctions.forEach( func => func() );
        break;
      case 'DEATH':
        this.onDeathFunctions.forEach( func => func() );
        break;
      default:
    }
  }
}

export default Hitpoint;
