const express = require("express");
const ctrl = require("../../controllers/contacts");

const {
  validate,
  isValidId,
  updateValiadation,
  updateFavoriteValidation,
  authenticate,
} = require("../../middlewares");

const {
  addSchema,
  addSchemaUpd,
  updateFavoriteSchema,
} = require("../../schemas");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validate(addSchema), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  updateValiadation(addSchemaUpd),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  updateFavoriteValidation(updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
