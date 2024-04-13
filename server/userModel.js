const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
