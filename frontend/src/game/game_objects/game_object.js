import Game from '../game';

class GameObject {
  constructor(id) {
    this.id = id;
    this.components = [];
    this.destroyed = false;
  }

  addComponent(component) {
    this.components.push(component);
    component.gameObject = this;
  }

  getComponent(componentClass) {
    return this.components.find(component =>
      component instanceof componentClass
    );
  }

  getComponents(componentClass) {
    return this.components.filter(component =>
      component instanceof componentClass
    );
  }

  destroy() {
    if (this.destroyed) return;
    this.components.forEach(component => component.onDestroy());
    Game.game.destroy(this.id);
    this.destroyed = true;
  }
}

export default GameObject;
