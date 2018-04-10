const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production'){
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

// TODO: remove mock data on server.
// const cards = {};
const cards = require('./mockData');

app.get('/api/cards', (req, res) => {
  res.send(Object.values(cards));
});

app.get('/api/cards/:id', (req, res) => {
  const card = cards[req.params.id];
  if (!card) {
    return res.status(404).send('Card does not exist.');
  }
  res.send(card);
});

app.post('/api/cards', ({ body: card }, res) => {
  const id = uuid();
  const newItem = { id, ...card };
  cards[id] = newItem;
  res.send(newItem);
});

app.put('/api/cards/:id', (req, res) => {
  const id = req.params.id;
  const card = cards[id];
  if (!card) {
    return res.status(404).send('Card does not exist.');
  }
  const newCard = { id, ...req.body };
  cards[id] = newCard;
  res.send(newCard);
});

app.delete('/api/cards/:id', (req, res) => {
  const id = req.params.id;
  const card = cards[id];
  if (!card) {
    return res.status(404).send('Card does not exist.');
  }
  delete cards[id];
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
