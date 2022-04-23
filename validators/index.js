const createProduct = require('./create-product.validator');
const updateProduct = require('./update-product.validator');
const deleteProduct = require('./delete-product.validator');
const login = require('./login.validator');
const signup = require('./signup.validator');
module.exports = {
  login,
  signup,
  createProduct,
  deleteProduct,
  updateProduct,
};
