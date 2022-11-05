const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    type: { type: String, default: "personel" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
