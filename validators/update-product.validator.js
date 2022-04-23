const Joi = require('joi');
const updateProductSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(45),
  imageUrl: Joi.string().max(100),
  price: Joi.number().min(0),
  details: Joi.object()
});
module.exports = updateProductSchema;
