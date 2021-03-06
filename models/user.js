const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScheam = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'USER',
  }
});

module.exports = mongoose.model('User', userScheam);
