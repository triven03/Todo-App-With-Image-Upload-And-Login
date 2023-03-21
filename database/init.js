const mongoose = require('mongoose');

module.exports = function()
{
  mongoose.connect('mongodb+srv://trivendra:12312312@cluster0.v0fa8wf.mongodb.net/Tridb?retryWrites=true&w=majority')
  .then(function()
  {
    console.log("connect to db")
  })
  .catch(function()
  {
    console.log("db connection error")
  })

}
