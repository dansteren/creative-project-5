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



app.listen(3000, () => console.log('Server listening on port 3000!'));
