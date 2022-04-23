const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  imageUrl: String,
  price: Number,
  details: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('Product', productSchema);