import Syncronizer from './syncronizer';
import Renderer from './renderers/renderer';
import Time from './time';
import Transform from './transform';

class Game {
  constructor(ctx, clientId, updateServerCallback, createOnServerCallback) {
    this.ctx = ctx;
    this.clientId = clientId;
    this.updateServerCallback = updateServerCallback;
    this.createOnServerCallback = createOnServerCallback;
    this.gameObjects = []; // not an array because they need to be keyed by id
    setInterval(this.sendUpdateToServer.bind(this), 100);
    Time.update();
    window.requestAnimationFrame(this.update.bind(this));
  }
  
  sendUpdateToServer() {
    const packet = {};

    packet.data = {};
    packet.actions = [];
    Syncronizer.all().forEach(syncronizer => {
      if (syncronizer.owned) {
        const pack = syncronizer.pack();
        if (pack !== null) packet.data[syncronizer.id] = pack;
      }

      syncronizer.actions.forEach(action => {
        action.sender = this.clientId;
        packet.actions.push(action);
      });
      syncronizer.actions = [];
    });

    this.updateServerCallback(packet);
  }

  receiveUpdateFromServer(packet) {
    Object.keys(packet.data).forEach(syncronizerId => {
      const syncronizer = Syncronizer.find(syncronizerId);
      if (syncronizer !== undefined && !syncronizer.owned) {
        syncronizer.unpack(packet.data[syncronizerId]);
      }
    });

    packet.actions.forEach(action => {
      if (action.sender !== this.clientId) {
        const syncronizer = Syncronizer.find(action.syncronizerId);
        syncronizer.component.handleAction(action);
      }
    });
  }

  update() {
    Time.update();
    this.ctx.clearRect(0, 0, 1000, 563);
    this.gameObjects.forEach(gameObject => {
      gameObject.components.forEach(component => {
        component.handleUpdating();
      });
      const renderer = gameObject.getComponent(Renderer);
      if (renderer !== undefined) {
        renderer.draw(this.ctx);
      }
    });
    window.requestAnimationFrame(this.update.bind(this));
  }

  sendCreateToServer(options, shouldOwn = false) {
    this.createOnServerCallback(options, shouldOwn);
  }
}

export default Game;
