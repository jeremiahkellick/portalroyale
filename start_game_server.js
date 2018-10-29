const getId = require('./get_id');

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

const startGameServer = io => {
  let objectsByOwnerId, objectCreationOptions, gameInProgress, state;
  const lobby = {};

  const restartGame = () => {
    objectsByOwnerId = {};
    objectCreationOptions = {};
    gameInProgress = false;
    state = { data: {}, actions: [] };

    for (let i = 0; i < 10; i++) {
      let id = getId();
      objectCreationOptions[id] = {
        id,
        type: 'tree',
        position: getFreePosition(Object.values(objectCreationOptions)),
        health: 100
      };

      id = getId();
      objectCreationOptions[id] = {
        id,
        type: 'explosiveCircle',
        position: getFreePosition(Object.values(objectCreationOptions)),
        health: 50
      };

      id = getId();
      objectCreationOptions[id] = {
        id,
        type: 'lootCrate',
        position: getFreePosition(Object.values(objectCreationOptions)),
        health: 50
      };

      id = getId();
      objectCreationOptions[id] = {
        id,
        type: 'medKit',
        position: getFreePosition(Object.values(objectCreationOptions)),
        health: 50
      };
    }
  };

  restartGame();

  const clearState = () => (state = { data: {}, actions: [] });
  io.on('connection', function(socket) {
    socket.on('join', name => {
      lobby[socket.id] = { name, ready: false };
      const players = {};
      Object.keys(lobby).forEach(id => {
        players[id] = { id, name: lobby[id].name, ready: lobby[id].ready };
      });
      socket.emit('players index', players);
      io.sockets.emit('player joined', { id: socket.id, name, ready: false});
    });

    const startIfEveryonesReady = () => {
      if (Object.values(lobby).every(player => player.ready)
          && Object.keys(lobby).length > 1 && !gameInProgress) {

        gameInProgress = true;
        Object.keys(lobby).forEach(socketId => {
          const socket = io.sockets.connected[socketId];
          if (socket) {
            socket.emit('start', Object.values(objectCreationOptions));
          }
        });
      }
    };

    socket.on('ready', () => {
      if (lobby[socket.id] !== undefined) {
        lobby[socket.id].ready = true;
        io.sockets.emit('player ready', socket.id);
      }
      startIfEveryonesReady();
    });

    socket.on('create', options => {
      if (options.ownerId !== undefined) {
        if (objectsByOwnerId[options.ownerId] === undefined) {
          objectsByOwnerId[options.ownerId] = [];
        }
        objectsByOwnerId[options.ownerId].push(options.id);
      }
      if (options.shouldSave !== false) {
        objectCreationOptions[options.id] = options;
      }
      if (options.type === 'player') {
        options.position = getFreePosition(
          Object.values(objectCreationOptions)
        );
      }
      io.sockets.emit('create', options);
    });

    socket.on('state', packet => {
      state.data = Object.assign(state.data, packet.data);
      packet.actions.forEach(action => {
        const syncronizerId = action.syncronizerId;
        const objectId = syncronizerId.slice(0, syncronizerId.length - 1);
        const options = objectCreationOptions[objectId];
        if (options !== undefined) handleAction(action, options);
      });
      state.actions = state.actions.concat(packet.actions);
    });

    socket.on('win', () => restartGame());

    socket.on('disconnect', () => {
      if (lobby[socket.id] !== undefined) {
        delete lobby[socket.id];
        io.sockets.emit('player left', socket.id);
        const playerIds = Object.keys(lobby);
        if (playerIds.length === 0) restartGame();
        startIfEveryonesReady();
      }

      if (objectsByOwnerId[socket.id] !== undefined &&
          objectsByOwnerId[socket.id].length > 0) {

        Object.keys(objectCreationOptions).forEach(id => {
          if (objectsByOwnerId[socket.id].includes(id)) {
            delete objectCreationOptions[id];
          }
        });
        io.sockets.emit('destroy', objectsByOwnerId[socket.id]);
      }
    });
  });

  setInterval(() => {
    io.sockets.emit('state', state);
    clearState();
  }, 100);

  setInterval(() => {
    if (gameInProgress) {
      const options = { id: getId(), type: 'portal' };
      options.position1 = getFreePosition(
        Object.values(objectCreationOptions)
      );
      options.position2 = getFreePosition(
        Object.values(objectCreationOptions)
      );
      while (colliding(options.position1, options.position2)) {
        options.position2 = getFreePosition(
          Object.values(objectCreationOptions)
        );
      }
      io.sockets.emit('create', options);
    }
  }, 14000);

  const handleAction = (action, options) => {
    switch (action.type) {
      case 'DAMAGE':
        options.health -= action.damage;
        if (options.health <= 0) delete objectCreationOptions[options.id];
        break;
      case 'HEAL':
        options.health = Math.min(options.health + action.amount, 100);
        break;
      default:
    }
  };
};

module.exports = startGameServer;
