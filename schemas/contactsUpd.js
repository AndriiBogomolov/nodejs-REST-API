const Joi = require("joi");

const addSchemaUpd = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

module.exports = addSchemaUpd;
