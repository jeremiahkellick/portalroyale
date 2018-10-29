import io from 'socket.io-client';
import Game from '../game/game';
import getId from '../game/get_id';
import rootCreator from '../game/game_objects/root_creator';
import { MAP_WIDTH, MAP_HEIGHT } from '../game/util';
import Vector from '../game/vector';
import { receiveSocket, startGame } from '../actions/game_actions';
import {
  receivePlayers,
  receivePlayer,
  removePlayer,
  readyPlayer,
} from '../actions/player_actions';

export const initializeGame = (name, dispatch) => {

  const socket = io();
  dispatch(receiveSocket(socket));
  const ctx = document.getElementById("canvas").getContext("2d");
  let game = undefined;
  const spawnedIds = new Set();

  const create = (options) => {
    if (!spawnedIds.has(options.id)) {
      spawnedIds.add(options.id);
      if (options.ownerId !== undefined) {
        options.owned = options.ownerId === socket.id;
        delete options.ownerId;
      }
      return rootCreator(options);
    }
  }

  const sendUpdateToServer = packet => socket.emit('state', packet);

  const sendCreateToServer = (options, shouldOwn = false) => {
    if (shouldOwn) options.ownerId = socket.id;
    options.sender = socket.id;
    options.id = getId();
    socket.emit('create', options);
    if (options.createNow !== false) {
      const obj = create(options);
      if (obj !== undefined) game.add(obj);
    }
  };

  const createAll = allOptions => {
    allOptions.forEach(options => {
      if (options.sender !== socket.id) {
        const obj = create(options);
        if (obj !== undefined) game.add(obj);
      }
    });
  };

  socket.on('connect', () => {
    getId.base = socket.id;
    socket.emit('join', name);
  });

  socket.on('player joined', player => dispatch(receivePlayer(player)));

  socket.on('player left', id => dispatch(removePlayer(id)));

  socket.on('players index', players => dispatch(receivePlayers(players)));

  socket.on('player ready', id => dispatch(readyPlayer(id)));

  socket.on('start', allOptions => {
    game = new Game(
      ctx,
      socket.id,
      sendUpdateToServer,
      sendCreateToServer,
      () => socket.disconnect(true),
      () => socket.emit('win'),
      dispatch
    );
    window.game = game;
    sendCreateToServer(
      {
        type: 'player',
        health: 100,
        name,
        createNow: false
      },
      true
    );
    createAll(allOptions);
    dispatch(startGame());
  });

  socket.on('create', options => {
    if (!game) return;
    if (options.createNow === false || options.sender !== socket.id) {
      const obj = create(options);
      if (obj !== undefined) game.add(obj);
    }
  });

  socket.on('state', packet => {
    if (!game) return;
    game.receiveUpdateFromServer(packet);
  });

  socket.on('destroy', objectIds => {
    if (!game) return;
    if (objectIds) {
      objectIds.forEach(id => {
        if (game.gameObjects[id] !== undefined) game.gameObjects[id].destroy();
      });
    }
  });
}
