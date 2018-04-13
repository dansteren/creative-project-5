const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../dist'));
}

// Knex Setup //
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//ENDPOINTS
//CARD****************************
//Add card
app.post('/api/cards', (req, res) => {
  console.log('add card');
  //in the body, donor, gift message. return whole card with card_id
});

//Delete card
app.delete('/api/cards/:id', (req, res) => {
  console.log('delete card');
  //get id from parameters. return 200
});

//Get all cards
app.get('/api/cards', (req, res) => {
  console.log('get all cards');
});

//Edit card
app.put('/api/cards/:id', (req, res) => {
  console.log('edit card');
  //get new card from the body. return the whole card
});

//AUTHENTICATION******************
//Log in
app.post('/api/login', (req, res) => {
  console.log('login end point');
  //Make sure all the information comes in the request
  if (!req.body.username || !req.body.password) return res.status(400).send();
  knex('users')
    .where('username', req.body.username)
    .first()
    .then(user => {
      if (user === undefined) {
        res.status(403).send('Invalid credentials');
        throw new Error('abort');
      }
      return [bcrypt.compare(req.body.password, user.hash), user];
    })
    .spread((result, user) => {
      if (result)
        res
          .status(200)
          .json({
            user: { username: user.username, name: user.name, id: user.id }
          });
      else res.status(403).send('Invalid credentials');
      return;
    })
    .catch(error => {
      if (error.message !== 'abort') {
        console.log(error);
        res.status(500).json({ error });
      }
    });
});

//Log out

//USER MANAGEMENT*****************
//Add user
//user information comes in the body
  //return the user back, and user_id.
app.post('/api/users', (req, res) => {
  console.log('add user');
  if (!req.body.username || !req.body.password || !req.body.name)
    return res.status(400).send();
  knex('users')
    .where('username', req.body.username)
    .first()
    .then(user => {
      if (user !== undefined) {
        res.status(409).send('User name already exists');
        throw new Error('abort');
      }
      return bcrypt.hash(req.body.password, saltRounds);
    })
    .then(hash => {
      return knex('users').insert({
        username: req.body.username,
        hash: hash,
        name: req.body.name,
      });
    })
    .then(ids => {
      return knex('users')
        .where('id', ids[0])
        .first()
        .select('username', 'name', 'id');
    })
    .then(user => {
      res.status(200).json({ user: user });
      return;
    })
    .catch(error => {
      if (error.message !== 'abort') {
        console.log(error);
        res.status(500).json({ error });
      }
    });
});

//My database managment

app.listen(3000, () => console.log('Server listening on port 3000!'));
