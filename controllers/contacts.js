const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(...req.body, {
    writeConcern: {
      w: "majority",
    },
  });
  res.status(201).json(result);

  res.json({ message: "template message" });
};

// const updateById = async (req, res, next) => {
//   try {
//     const { err, value } = updatedContactValid.validate(req.body);
//     if (err || !Object.keys(value).length) {
//       return res.status(400).json({ message: "missing fields" });
//     }
//   } catch (err) {
//     next(err);
//   }
//   const { id } = req.params;
//   const updatedContact = await Contact.updateContact(id, req.body);
//   if (!updatedContact) {
//     return next();
// throw HttpError(404, "Not found");
//   }
//   res.status(200).json({ updatedContact });
// };

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!req.body) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id, {
    writeConcern: {
      w: "majority",
    },
  });

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
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
