const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true, lowercase: true },
  pass: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});
const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
