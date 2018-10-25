import Syncronizer from './syncronizer';
import Time from './time';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './util';
import Camera from './game_components/camera';

class Game {
  constructor(ctx, clientId, updateServerCallback, createOnServerCallback) {
    Game.game = this;
    this.ctx = ctx;
    ctx.font = 'bold 16px Roboto';
    ctx.textAlign = "center";
    this.clientId = clientId;
    this.updateServerCallback = updateServerCallback;
    this.createOnServerCallback = createOnServerCallback;
    this.gameObjects = {};
    setInterval(this.sendUpdateToServer.bind(this), 100);
    Time.update();
    setInterval(this.update.bind(this), 1000 / 60);
    window.requestAnimationFrame(this.draw.bind(this));
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
      syncronizer.clearActions();
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
        if (syncronizer !== undefined) syncronizer.component.handleAction(action);
      }
    });
  }

  update() {
    Time.update();
    Object.values(this.gameObjects).forEach(gameObject => {
      gameObject.components.forEach(component => {
        component.handleUpdating();
      });
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (Camera.camera !== undefined) Camera.camera.draw(this.ctx);
    window.requestAnimationFrame(this.draw.bind(this));
  }

  sendCreateToServer(options, shouldOwn = false) {
    this.createOnServerCallback(options, shouldOwn);
  }

  destroy(gameObjectId) {
    const gameObject = this.gameObjects[gameObjectId];
    if (gameObject !== undefined) {
      gameObject.components.forEach(component => {
        if (component.syncronizer !== undefined) {
          component.syncronizer.destroy();
        }
      });
    }
    delete this.gameObjects[gameObjectId];
  }
}

Game.game = null;

export default Game;
