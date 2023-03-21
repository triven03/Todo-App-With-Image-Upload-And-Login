const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  userid: String,
  password: String,
  profile_pic: String
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;

