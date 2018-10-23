import Game from './game';

class GameObject {
  constructor(id, sort) {
    this.id = id;
    this.components = [];
    this.sort = 0; 
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
