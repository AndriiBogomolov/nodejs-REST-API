const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
  id: Joi.string(),
});
module.exports = addSchema;
