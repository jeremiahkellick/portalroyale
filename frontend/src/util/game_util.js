import io from 'socket.io-client';
import Game from '../game/game';
import getId from '../game/get_id';
import rootCreator from '../game/game_objects/root_creator';
import { MAP_WIDTH, MAP_HEIGHT } from '../game/util';
import Vector from '../game/vector';

export const initializeGame = ( name, dispatch ) => {

  const socket = io();
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
    const obj = create(options);
    if (obj !== undefined) game.gameObjects[options.id] = obj;
  };

  socket.on('connect', () => {
    getId.base = socket.id;
    game = new Game(ctx, socket.id, sendUpdateToServer, sendCreateToServer, dispatch);
    window.game = game;
    sendCreateToServer(
      {
        type: 'player',
        position: Vector.random(MAP_WIDTH, MAP_HEIGHT).toPOJO(),
        health: 100,
        name
      },
      true
    );
  });

  socket.on('create', options => {
    if (options.sender !== socket.id) {
      const obj = create(options);
      if (obj !== undefined) game.gameObjects[options.id] = obj;
    }
  });

  socket.on('create all', allOptions => {
    allOptions.forEach(options => {
      if (options.sender !== socket.id) {
        const obj = create(options);
        if (obj !== undefined) game.gameObjects[options.id] = obj;
      }
    });
  });

  socket.on('state', packet => {
    game.receiveUpdateFromServer(packet);
  });

  socket.on('destroy', objectIds => {
    if (objectIds) {
      objectIds.forEach(id => {
        game.destroy(id);
      });
    }
  });

}

