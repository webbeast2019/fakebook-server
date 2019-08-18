const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  text: String,
  image: String,
  imageFile: Buffer,
});

module.exports = mongoose.model('Post', postSchema);
