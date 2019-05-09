const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./util/database');
const cors = require('cors');
const user = require('./routes/user');

app.use(cors({
  credentials: true,
  origin: true
}))

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', user);

db.getConnection().then(() => {
  console.log('CONNECTED TO DATABASE');
  app.listen(3000, () => {
    console.log('CONNECTED TO 3000');
  });
}).catch((err) => {
  console.log(err);
})

