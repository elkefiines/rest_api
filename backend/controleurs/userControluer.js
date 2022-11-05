// container for user

const User = require("../modules/User");
const { validationResult } = require("express-validator");

const controleur = {};

/**
 * @route GET/api/uers
 * @desc Get all users
 * @access Private
 */
controleur.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  //res.json({ msg: "Get user" });
};
/**
 * @route Post/api/uers
 * @desc Add new users
 * @access Private
 */
controleur.createUsers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { name, email, phone, type } = req.body;
  try {
    const newUser = new User({ name, email, phone, type });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  //res.json({ msg: req.body });
};
/**
 * @route PUT/api/uers/:id
 * @desc Update user
 * @access Private
 */
controleur.updateUsers = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  //build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  if (type) userFields.type = type;
  try {
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "contact not found" });
    user = await User.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  //res.json({ msg: "Update user" });
};
/**
 * @route DELETE/api/uers/:id
 * @desc Delete user
 * @access Private
 */
controleur.DeleteUsers = async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "contact not found" });
    user = await User.deleteOne({ _id: id });
    res.json({ msg: " Contact removed " });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  //res.json({ msg: "Delete user" });
};

// export the module
module.exports = controleur;
