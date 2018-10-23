class GameObject {
  constructor() {
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
}

export default GameObject;
