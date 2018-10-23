class Syncronizer {
  constructor(id, component, owned = false) {
    this.id = id;
    this.component = component;
    component.syncronizer = this;
    this.owned = owned;
    this.actions = [];
    Syncronizer.byId[this.id] = this;
  }

  update() {}

  pack() {
    return null;
  }

  unpack(data) {}

  dispatch(action) {
    action.syncronizerId = this.id;
    action.time = new Date();
    this.actions.push(action);
  }

  destroy() {
    Syncronizer.destroy(this.id);
  }

  static find(id) {
    return Syncronizer.byId[id];
  }

  static all() {
    return Object.values(Syncronizer.byId);
  }

  static destroy(syncronizerId) {
    delete Syncronizer.byId[syncronizerId];
  }
}

Syncronizer.byId = {};

export default Syncronizer;
