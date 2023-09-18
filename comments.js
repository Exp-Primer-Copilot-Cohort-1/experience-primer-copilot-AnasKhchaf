// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use body parser for post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up database
const db = require('./config/database');
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Get models
const Comment = require('./models/Comment');
const User = require('./models/User');

// Set up routes
app.get('/', (req, res) => {
  Comment.findAll()
    .then(comments => {
      res.json(comments);
    })
    .catch(err => console.log('Error: ' + err));
});

app.post('/', (req, res) => {
  const { name, text } = req.body;
  const newComment = new Comment({
    name,
    text
  });

  newComment
    .save()
    .then(comment => {
      res.json(comment);
    })
    .catch(err => console.log('Error: ' + err));
});

app.get('/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log('Error: ' + err));
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  const newUser = new User({
    name
  });

  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log('Error: ' + err));
});

app.listen(port, () => console.log(`Server started on port ${port}`));