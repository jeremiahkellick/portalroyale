import Syncronizer from './syncronizer';
import Time from './time';
import Camera from './game_components/camera';
import { gameOver  } from '../actions/game_actions';
import getId from './get_id';
import GameObject from './game_objects/game_object';
import PlayersAliveRenderer from './renderers/players_alive_renderer';
import ObjectTracker from './game_components/object_tracker';
import { receivePlayers } from '../actions/player_actions';

class Game {
  constructor(
    ctx,
    clientId,
    updateServerCallback,
    createOnServerCallback,
    gameOverCallback,
    dispatch
  ) {
    Game.game = this;
    this.over = false;
    this.ctx = ctx;
    this.clientId = clientId;
    this.updateServerCallback = updateServerCallback;
    this.createOnServerCallback = createOnServerCallback;
    this.gameOverCallback = gameOverCallback;
    this.gameObjects = {};
    this.dispatch = dispatch;
    const playerCountId = getId();
    const playerCount = new GameObject(playerCountId);
    playerCount.addComponent(new PlayersAliveRenderer(10));
    this.gameObjects[playerCountId] = playerCount;
    ObjectTracker.onChange('players', players =>
      this.dispatch(receivePlayers(players))
    );
    this.started = false;
    this.unsubscribe = window.store.subscribe(() => {
      if (window.store.getState().game.started) {
        this.unsubscribe();
        this.start();
      }
    });
  }

  start() {
    this.started = true;
    this.networkInterval = setInterval(this.sendUpdateToServer.bind(this), 100);
    Time.update();
    this.updateInterval = setInterval(this.update.bind(this), 1000 / 60);
    window.requestAnimationFrame(this.draw.bind(this));
  }

  endGame() {
    this.over = true;
    Object.values(this.gameObjects).forEach(gameObject => gameObject.destroy());
    clearInterval(this.networkInterval);
    clearInterval(this.updateInterval);
    Game.game = null;
    this.gameOverCallback();
   this.dispatch(gameOver());
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
        if (syncronizer !== undefined) {
          syncronizer.component.handleAction(action);
        }
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
    if (this.over) return;
    const canvas = document.getElementById("canvas");
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
