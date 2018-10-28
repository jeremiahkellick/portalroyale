require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const startGameServer = require('./start_game_server');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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

startGameServer(io);
