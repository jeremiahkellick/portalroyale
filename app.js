const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const getId = require('./get_id');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users);
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
        .then(() => console.log('Connected to MongoDB successfully'))
        .catch(err => console.log(err));
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello, world!'));

server.listen(port, () => console.log(`Server is running on port ${port}`));

getId.base = '.';

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomVectorInMap = () => {
  const x = randomInt(0, 2500);
  const y = randomInt(0, 2500);
  return { x, y };
};

const objectsByOwnerId = {};
let objectCreationOptions = {};

for (let i = 0; i < 10; i++) {
  const id = getId();
  objectCreationOptions[id] = {
    id,
    type: 'tree',
    position: randomVectorInMap(),
    health: 100
  };
}

let state = { data: {}, actions: [] };
const clearState = () => (state = { data: {}, actions: [] });
io.on('connection', function(socket) {
  socket.emit('create all', Object.values(objectCreationOptions));

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

  socket.on('disconnect', () => {
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

const handleAction = (action, options) => {
  switch (action.type) {
    case 'DAMAGE':
      options.health -= action.damage;
      if (options.health <= 0) delete objectCreationOptions[options.id];
      break;
    default:
  }
};
