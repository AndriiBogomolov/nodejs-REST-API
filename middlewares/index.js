const validateAdd = require("./validateAdd");
const validate = require("./validate");
const updateValiadation = require("./validateUpdate");
const updateFavoriteValidation = require("./updateFavoriteValidation");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  validateAdd,
  validate,
  isValidId,
  updateValiadation,
  updateFavoriteValidation,
  authenticate,
  upload,
};
