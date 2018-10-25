import Game from '../game';

class GameObject {
  constructor(id, sort) {
    this.id = id;
    this.components = [];
    this.sort = sort || 0;
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
    this.components.forEach(component => component.onDestroy());
    Game.game.destroy(this.id);
  }
}

export default GameObject;
