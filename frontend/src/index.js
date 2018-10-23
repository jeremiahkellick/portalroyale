import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';
import Game from './game/game';
import getId from './game/get_id';
import rootCreator from './game/root_creator';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  serviceWorker.unregister();

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
    game = new Game(ctx, socket.id, sendUpdateToServer, sendCreateToServer);
    window.game = game;
    sendCreateToServer({ type: 'player' }, true);
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
    console.log(objectIds);
    if (objectIds) {
      objectIds.forEach(id => {
        delete game.gameObjects[id];
      });
    }
  });
});
