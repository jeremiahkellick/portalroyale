import Component from './component';
import Inventory from './inventory';

class Hitpoint extends Component {
  constructor(health) {
    super();
    this.onDamageFunctions = [];
    this.onDeathFunctions = [];
    this.onLocalDeathFunctions = [];
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

  onLocalDeath(func) {
    this.onLocalDeathFunctions.push(func);
  }

  damage(damage) {
    if (damage >= this.health) {
      this.localDeath();
    }
    this.dispatch({ type: 'DAMAGE', damage });
  }

  heal(amount) {
    this.dispatch({ type: 'HEAL', amount });
  }

  localDeath() {
    this.onLocalDeathFunctions.forEach( func => func() );
  }

  death(senderName) {
    this.onDeathFunctions.forEach( func => func(senderName) );
    this.gameObject.destroy();
  }

  handleAction(action) {
    switch (action.type) {
      case 'DAMAGE':
        this.health = Math.max(this.health - action.damage, 0);
        this.onDamageFunctions.forEach( func => func() );
        if (this.health === 0) this.death(action.senderName);
        break;
      case 'HEAL':
        this.health = Math.min(this.health + action.amount, this.maxHealth);
        break;
      default:
    }
  }
}

export default Hitpoint;
