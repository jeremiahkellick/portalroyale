import Syncronizer from './syncronizer';
import Time from './time';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './util';
import Camera from './game_components/camera';
import { gameOver } from '../actions/game_actions';
import { clearPlayers } from '../actions/player_actions';
import getId from './get_id';
import GameObject from './game_objects/game_object';
import PlayersAliveRenderer from './renderers/players_alive_renderer';
import { win } from '../actions/game_actions';

class Game {
  constructor(
    ctx,
    clientId,
    updateServerCallback,
    createOnServerCallback,
    gameOverCallback,
    winCallback,
    dispatch
  ) {
    Game.game = this;
    this.over = false;
    this.ctx = ctx;
    this.clientId = clientId;
    this.updateServerCallback = updateServerCallback;
    this.createOnServerCallback = createOnServerCallback;
    this.gameOverCallback = gameOverCallback;
    this.winCallback = winCallback;
    this.gameObjects = {};
    this.dispatch = dispatch;
    const playerCountId = getId();
    const playerCount = new GameObject(playerCountId);
    playerCount.addComponent(new PlayersAliveRenderer(10));
    this.gameObjects[playerCountId] = playerCount;
    this.networkInterval = setInterval(this.sendUpdateToServer.bind(this), 100);
    Time.update();
    this.updateInterval = setInterval(this.update.bind(this), 1000 / 60);
    window.requestAnimationFrame(this.draw.bind(this));
    this.winFlag = false;
  }

  endGame() {
    this.over = true;
    Object.values(this.gameObjects).forEach(gameObject => gameObject.destroy());
    clearInterval(this.networkInterval);
    clearInterval(this.updateInterval);
    Game.game = null;
    this.gameOverCallback();
    this.dispatch(clearPlayers());
    this.dispatch(gameOver());
  }

  win() {
    setTimeout(() => {
      this.dispatch(win());
      this.winCallback();
      this.endGame();
    }, 1000);
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
