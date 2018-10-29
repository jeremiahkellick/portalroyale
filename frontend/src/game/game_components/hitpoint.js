import Component from './component';
import Inventory from './inventory';

class Hitpoint extends Component {
  constructor(health) {
    super();
    this.onDamageFunctions = [];
    this.onDeathFunctions = [];
    this.health = health;
    this.maxHealth = health;
  }

  start() {
    this.inventory = this.gameObject.getComponent(Inventory);
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

  heal(amount) {
    this.dispatch({ type: 'HEAL', amount });
  }

  death() {
    this.onDeathFunctions.forEach( func => func() );
    if (this.inventory) this.inventory.dropItems();
    this.gameObject.destroy();
  }

  handleAction(action) {
    switch (action.type) {
      case 'DAMAGE':
        this.health = Math.max(this.health - action.damage, 0);
        this.onDamageFunctions.forEach( func => func() );
        if (this.health === 0) this.death();
        break;
      case 'HEAL':
        this.health = Math.min(this.health + action.amount, this.maxHealth);
        break;
      default:
    }
  }
}

export default Hitpoint;
