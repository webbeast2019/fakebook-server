const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  text: String,
});

module.exports = mongoose.model('Post', postSchema);
