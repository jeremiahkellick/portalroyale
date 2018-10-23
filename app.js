const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

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

const objectCreationOptions = [];
let state = { data: {}, actions: [] };
const clearState = () => (state = { data: {}, actions: [] });
io.on('connection', function(socket) {
  socket.emit('create all', objectCreationOptions);
  socket.on('create', options => {
    objectCreationOptions.push(options);
    io.sockets.emit('create', options);
  });
  socket.on('state', packet => {
    state.data = Object.assign(state.data, packet.data);
    state.actions = state.actions.concat(packet.actions);
  });
});

setInterval(() => {
  io.sockets.emit('state', state);
  clearState();
}, 100);
