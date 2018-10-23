class Component {
  constructor() {
    this.gameObject = undefined;
    this.hasStarted = false;
  }

  requireComponent(componentClass) {
    const component = this.gameObject.getComponent(componentClass);
    if (component === undefined) {
      throw new ComponentRequireError(
        `${this.constructor.name} requires ${componentClass.name}`
      );
    } else {
      return component;
    }
  }

  handleUpdating() {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.start();
    }
    this.update();
  }

  start() {}

  update() {}

  dispatch(action) {
    if (this.syncronizer !== undefined) this.syncronizer.dispatch(action);
    this.handleAction(action);
  }

  handleAction(action) {}
}

class ComponentRequireError extends Error {}

export default Component;
