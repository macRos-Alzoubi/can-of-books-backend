const mongoose = require('mongoose');

const modelObj = {};

const bookSchema = new mongoose.Schema({
  title : String,
  description : String,
  status : String,
});

const userSchema = new mongoose.Schema({
  email: String,
  books: [bookSchema]
});

modelObj.bookModel = mongoose.model('book', bookSchema);
modelObj.userModel = mongoose.model('userBooks', userSchema);
module.exports = modelObj;