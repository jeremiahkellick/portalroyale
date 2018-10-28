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
    this.destroyed = true;
    this.components.forEach(component => component.onDestroy());
    if (Game.game) Game.game.destroy(this.id);
  }
}

export default GameObject;
