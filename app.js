require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const startGameServer = require('./start_game_server');
const path = require('path');
const db = require('./config/keys').mongoURI;

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const stats = require('./routes/api/stats');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(db,{ useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB successfully'))
        .catch(err => console.log(err));


app.use('/api/users', users);
app.use('/api/stats', stats);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello, world!'));

server.listen(port, () => console.log(`Server is running on port ${port}`));

startGameServer(io);
