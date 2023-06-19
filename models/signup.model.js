const mongoose = require("mongoose");
const bcriptjs = require("bcryptjs");
const signUp = new mongoose.Schema({
  first_name: "string",
  last_name: "string",
  email: "string",
  password: "string",
});
signUp.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hased = await bcriptjs.hash(this.password, 10);
    this.password = hased;

    return next();
  } catch (err) {
    return next(err);
  }
});
module.exports = mongoose.model("signUp", signUp);
