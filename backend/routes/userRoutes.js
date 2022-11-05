const express = require("express");
const { body } = require("express-validator");
const {
  getUsers,
  createUsers,
  updateUsers,
  DeleteUsers,
} = require("../controleurs/userControluer");
const router = express.Router();
router.get("/", getUsers);
router.post(
  "/",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
  ],
  createUsers
);
router.put("/:id", updateUsers);
router.delete("/:id", DeleteUsers);
module.exports = router;
