import io from 'socket.io-client';
import Game from '../game/game';
import getId from '../game/get_id';
import rootCreator from '../game/game_objects/root_creator';
import { receiveSocket, startGame } from '../actions/game_actions';
import {
  receivePlayers,
  receivePlayer,
  removePlayer,
  readyPlayer,
} from '../actions/player_actions';

export const initializeGame = (name, online, dispatch) => {
  let socket = { id: getId() };
  if (online) {
    socket = io();
    dispatch(receiveSocket(socket));
  }
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

  const noOp = () => {};

  const sendUpdateToServer = packet => socket.emit('state', packet);

  const sendCreateToServer = (options, shouldOwn = false) => {
    if (shouldOwn) options.ownerId = socket.id;
    options.sender = socket.id;
    options.id = getId();
    if (online) socket.emit('create', options);
    if (!online || options.createNow !== false) {
      const obj = create(options);
      if (obj !== undefined) game.add(obj)
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

  const start = allOptions => {
    game = new Game(
      ctx,
      socket.id,
      online ? sendUpdateToServer : noOp,
      sendCreateToServer,
      online ? () => socket.disconnect(true) : noOp,
      online ? () => socket.emit('win') : noOp,
      dispatch
    );
    window.game = game;
    const playerOptions = {
      type: 'player',
      health: 100,
      name,
      createNow: false
    };
    if (!online) playerOptions.position = getFreePosition(allOptions);
    sendCreateToServer(playerOptions, true);
    if (allOptions !== undefined) createAll(allOptions);
    dispatch(startGame());
  }

  if (online) {
    socket.on('connect', () => {
      getId.base = socket.id;
      socket.emit('join', name);
    });

    socket.on('player joined', player => dispatch(receivePlayer(player)));

    socket.on('player left', id => dispatch(removePlayer(id)));

    socket.on('players index', players => dispatch(receivePlayers(players)));

    socket.on('player ready', id => dispatch(readyPlayer(id)));

    socket.on('start', allOptions => {
      start(allOptions);
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
          if (game.gameObjects[id] !== undefined) {
            game.gameObjects[id].destroy();
          }
        });
      }
    });
  } else {
    start(generateMapOptions());
  }
}

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomVectorInMap = () => {
  const x = randomInt(23, 2454);
  const y = randomInt(23, 2454);
  return { x, y };
};

const colliding = (a, b) => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) < 164;
};

const getFreePosition = (existingObjects) => {
  const position = randomVectorInMap();
  if (existingObjects.some(object => {
    if (!object.position) return false;
    return colliding(position, object.position);
  })) {
    return getFreePosition(existingObjects);
  }
  return position;
};

const generateMapOptions = () => {
  const objectCreationOptions = [];

  for (let i = 0; i < 10; i++) {
    let id = getId();
    objectCreationOptions.push({
      id,
      type: 'tree',
      position: getFreePosition(objectCreationOptions),
      health: 100
    });

    id = getId();
    objectCreationOptions.push({
      id,
      type: 'explosiveCircle',
      position: getFreePosition(objectCreationOptions),
      health: 50
    });

    id = getId();
    objectCreationOptions.push({
      id,
      type: 'lootCrate',
      position: getFreePosition(objectCreationOptions),
      health: 50
    });

    id = getId();
    objectCreationOptions.push({
      id,
      type: 'medKit',
      position: getFreePosition(objectCreationOptions),
      health: 50
    });
  }

  return objectCreationOptions;
};
