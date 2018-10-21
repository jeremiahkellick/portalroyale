const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', users);
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
        .then(() => console.log('Connected to MongoDB successfully'))
        .catch(err => console.log(err));
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(port, () => console.log(`Server is running on port ${port}`));
