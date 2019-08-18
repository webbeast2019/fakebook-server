const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  text: String,
  image: String,
});

module.exports = mongoose.model('Post', postSchema);
