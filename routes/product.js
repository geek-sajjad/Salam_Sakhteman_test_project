const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { adminOnly, loggedIn } = require('../middlewares/auth');
const validationSchema = require('../validators/index');
const validate = require('../middlewares/validator');

router.get('/product', productController.getProducts);
router.post(
  '/product',
  loggedIn,
  adminOnly,
  validate(validationSchema.createProduct),
  productController.createProduct
);
router.patch(
  '/product',
  loggedIn,
  adminOnly,
  validate(validationSchema.updateProduct),
  productController.updateProduct
);
router.delete(
  '/product',
  loggedIn,
  adminOnly,
  validate(validationSchema.deleteProduct),
  productController.removeProduct
);

module.exports = router;
