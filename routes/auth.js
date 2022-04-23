const express = require('express');
const { login, signup } = require('../controllers/auth');
const router = express.Router();
const validationSchema = require('../validators/index');
const validate = require('../middlewares/validator');

router.post('/login', validate(validationSchema.login), login);
router.post('/signup', validate(validationSchema.signup), signup);

module.exports = router;
