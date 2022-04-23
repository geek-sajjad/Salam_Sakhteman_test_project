const Product = require('../models/product');
const translateObjectKeys = require('../utils/translator');

exports.getProducts = async (req, res, next) => {
  try {
    const filters = req.query;
    const filter = {};
    for (key in filters) {
      if (parseFloat(filters[key])) {
        filter[`details.${key}`] = parseFloat(filters[key]);
      } else {
        filter[`details.${key}`] = filters[key];
      }
    }
    const products = await Product.find(filter);

    // translating object keys to Farsi keys
    products.forEach(product => {
      product.details = translateObjectKeys(product.details);
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id, name, imageUrl, details, price } = req.body;
    const result = await Product.updateOne(
      { _id: id },
      { $set: { name, imageUrl, details, price } }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await Product.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
