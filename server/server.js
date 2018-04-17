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

// jwt setup
const jwt = require('jsonwebtoken');
let jwtSecret = process.env.jwtSecret;
if (jwtSecret === undefined) {
  console.log(
    'You need to define a jwtSecret environment variable to continue.'
  );
  knex.destroy();
  process.exit();
}

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send({ error: 'No token provided.' });
  jwt.verify(token, jwtSecret, function(err, decoded) {
    if (err)
      return res.status(500).send({ error: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userID = decoded.id;
    next();
  });
};

const DEFAULT_MESSAGE =
  'Dear {donor},\n\n' +
  'Thank you for coming to our wedding! It truly would not have been the same ' +
  'without all of our family and friends there. We were so happy to receive ' +
  'the {gift} and we look forward to using it for years to come.\n\n' +
  'With gratitude,\n\n' +
  'Joshua & Samantha\n\n' +
  'P.S. {message}\n';

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
//in the body, donor, gift message. return whole card with card_id
app.post('/api/cards', verifyToken, (req, res) => {
  console.log('add card');

  //Make sure all of the information comes in the body
  if (!req.body.gift || !req.body.donor) return res.status(400).send();

  let message;
  if (!req.body.message) message = '';
  else message = req.body.message;

  //query to add card
  knex('gifts')
    .insert({
      gift: req.body.gift,
      user_id: req.userID,
      donor: req.body.donor,
      psmessage: message
    })
    .then(ids => {
      return knex('gifts')
        .where('id', ids[0])
        .first()
        .select();
    })
    .then(card => {
      res.status(200).json({ card: card });
      return;
    })
    .catch(error => {
      console.log('could not add a new card');
      res.status(500).json({ error });
    });
});

//Delete card
//get id from parameters. return 200
app.delete('/api/cards/:id', verifyToken, (req, res) => {
  console.log('delete card');

  knex('gifts')
    .where('id', req.params.id)
    .first()
    .select()
    .then(result => {
      if (result === undefined)
        res.status(403).send('id is incorrect. no matching row');
      throw new Error('abort');
    })
    .catch(error => {
      return;
    });

  knex('gifts')
    .where('id', req.params.id)
    .del()
    .then(result => {
      res.status(200).send();
      return;
    })
    .catch(error => {
      console.log('could not delete card ');
      if (error.message !== 'abort') {
        console.log(error);
        res.status(500).json({ error });
      }
    });
});

//Get all cards
app.get('/api/cards', (req, res) => {
  console.log('get all cards');

  knex('gifts')
    .select()
    .then(cards => {
      res.status(200).json({ cards });
    })
    .catch(error => {
      console.log('Couldnt get all cards');
      if (error.message !== 'abort') {
        console.log(error);
        res.status(500).json({ error });
      }
    });
});

//Edit card
//get new card from the body. return the whole card
app.put('/api/cards/:id', verifyToken, (req, res) => {
  console.log('edit card');

  //Make sure all of the information comes in the body
  if (!req.body.gift || !req.body.donor) return res.status(400).send();

  let message;
  if (!req.body.psmessage) message = '';
  else message = req.body.psmessage;

  knex('gifts')
    .where('id', req.params.id)
    .update({
      gift: req.body.gift,
      user_id: req.userID,
      donor: req.body.donor,
      psmessage: message
    })
    .then(ids => {
      return knex('gifts')
        .where('id', req.params.id)
        .first()
        .select();
    })
    .then(card => {
      res.status(200).json({ card });
      return;
    })
    .catch(error => {
      console.log("couldn't edit a card");
      if (error.message !== 'abort') {
        console.log(error);
        res.status(500).json({ error });
      }
    });
});

//Edit default message
app.put('/api/message', verifyToken, (req, res) => {
  console.log('edit default message');

  knex('users')
    .where('id', req.userID)
    .update({
      defaultmessage: req.body.message
    })
    .then(ids => {
      return knex('users')
        .where('id', req.userID)
        .first()
        .select('defaultmessage');
    })
    .then(message => {
      res.status(200).send(message);
      return;
    })
    .catch(error => {
      console.log('Could not edit default message');
      res.status(500).json({ error });
    });
});

//Get default message for user id
app.get('/api/message', verifyToken, (req, res) => {
  console.log('get default message for user');

  knex('users')
    .select('defaultmessage as message')
    .where('id', req.userID)
    .first()
    .then(message => {
      res.status(200).json(message);
      return;
    })
    .catch(error => {
      console.log('could not get default message ');
    });
});

//AUTHENTICATION******************
//Log in
app.post('/api/login', (req, res) => {
  console.log('login end point');
  //Make sure all the information comes in the request.
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
      if (result) {
        let token = jwt.sign({ id: user.id }, jwtSecret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({
          user: {
            username: user.username,
            name: user.name,
            id: user.id
          },
          message: user.defaultmessage,
          token: token
        });
      } else {
        res.status(403).send('Invalid credentials');
      }
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
        defaultmessage: DEFAULT_MESSAGE
      });
    })
    .then(ids => {
      return knex('users')
        .where('id', ids[0])
        .first()
        .select();
    })
    .then(user => {
      let token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).json({ user: user, token: token });
      return;
    })
    .catch(error => {
      if (error.message !== 'abort') {
        console.log(error);
        res.status(500).json({ error });
      }
    });
});

// Get my account
app.get('/api/me', verifyToken, (req, res) => {
  knex('users')
    .where('id', req.userID)
    .first()
    .select('username', 'name', 'id')
    .then(user => {
      res.status(200).json({ user: user });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

//My database managment

app.listen(3000, () => console.log('Server listening on port 3000!'));
