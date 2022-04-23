require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const User = require('./models/user');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');

const error = require('./controllers/error');
const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('hello world');
});

app.use(authRoutes);
app.use(productRoutes);

app.use(error.get404);
app.use(error.get500);

mongoose
  .connect('mongodb://localhost:27017/salam_sakhteman')
  .then(_ => {
    return User.findOne();
  })
  .then(user => {
    if (!user) {
      return User.create({
        email: 'user@me.com',
        password:'$2b$10$nz8gFGMt7a32wVZKm3iZNOowD9zCYQJaIOIR2QU0ohkyVH7I5vdu6', // hashed password 123465
        role: 'ADMIN',
        name: 'admin',
      });
    }
  })
  .then(_ => {
    app.listen(3000, () => console.log('listening in port 3000'));
  })
  .catch(e => console.log(e));
