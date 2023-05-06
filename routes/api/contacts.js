const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validate,
  isValidId,
  updateValiadation,
  updateFavoriteValidation,
} = require("../../middlewares");
// const { updateFavoriteSchema } = require("../../schemas/updateFavoriteSchema");

const {
  addSchema,
  addSchemaUpd,
  updateFavoriteSchema,
} = require("../../schemas");

// const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validate(addSchema), ctrl.add);

router.put("/:id", isValidId, updateValiadation(addSchemaUpd), ctrl.updateById);

router.patch(
  "/:id/favorite",
  isValidId,
  updateFavoriteValidation(updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
