const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "", { skip, limit });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing required name field");
  // }
  const { _id: owner } = req.user;

  const result = await Contact.create(
    { ...req.body, owner },
    {
      writeConcern: {
        w: "majority",
      },
    }
  );
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  // const { error } = addSchemaUpd.validate(req.body);
  // if (error) {
  //   HttpError(400, error.message);
  // }

  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { ...req.body },
    { new: true },
    {
      writeConcern: {
        w: "majority",
      },
    }
  );
  console.log(result);
  if (result === null) {
    next(HttpError(404, "Not found"));
  }
  if (!result) {
    HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { ...req.body },
    {
      writeConcern: {
        w: "majority",
      },
    },
    {
      new: true,
    }
  );
  if (!req.body) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  // console.log(req.body);
  const result = await Contact.findOneAndRemove(
    { _id: id, owner },
    {
      writeConcern: {
        w: "majority",
      },
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
