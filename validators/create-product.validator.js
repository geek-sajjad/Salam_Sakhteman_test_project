const Joi = require('joi');
const createProductSchema = Joi.object({
  name: Joi.string().max(45).required(),
  imageUrl: Joi.string().max(100).required(),
  price: Joi.number().min(0).required(),
  details: Joi.object()
});
module.exports = createProductSchema;
