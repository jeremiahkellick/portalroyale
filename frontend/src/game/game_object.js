import Game from './game';

class GameObject {
  constructor(id) {
    this.id = id;
    this.components = [];
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

  destroy() {
    Game.game.destroy(this.id);
  }
}

export default GameObject;
