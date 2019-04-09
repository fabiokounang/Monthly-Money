const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const user = require('./routes/user');
const logItem = require('./routes/logItem');
const category = require('./routes/category');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request, Accept', 'Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', user);
app.use('/logItems', logItem);
app.use('/categories', category);

mongoose.connect('mongodb+srv://fabio:fabio@monthly-money-3aljl.gcp.mongodb.net/Mo-Mo?retryWrites=true', { useNewUrlParser: true }).then(() => {
  console.log('CONNECTED TO MONGODB');
  app.listen(3000, () => {
    console.log('CONNECTED TO 3000');
  });
}).catch((err) => {
  console.log(err);
})