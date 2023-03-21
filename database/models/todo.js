const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  text: String,
  createdBy: String,
  pic:String
});

const todoModel = new mongoose.model("todo", todoSchema);

module.exports = todoModel;

