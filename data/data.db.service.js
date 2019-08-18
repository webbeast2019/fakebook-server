const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'fakebook';
const mongoose = require('mongoose');
const Post = require('../models/post.model');

// connection
mongoose.connect(`${url}/${dbName}`, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`Connected to mongoDB[${dbName}] using mongoose!`)
});

module.exports.creatPost = (postData, callback) => {
  const post = new Post({
    text: postData.text
  });

  post.save(function (err, result) {
    assert.strictEqual(null, err);
    console.log('mongoose operation success', result);
    callback(result);
  });
};

module.exports.updatePostById = (_id, postData, callback) => {
  Post.findOneAndUpdate({_id}, {text: postData.text}, (function (err, result) {
    assert.strictEqual(null, err);
    console.log('mongoose update operation success', result);
    callback(result);
  }))
};

module.exports.getAllPosts = (callback) => {
  Post.find(function (err, posts) {
    assert.strictEqual(null, err);
    console.log(`mongoose operation success - got ${posts.length} posts`);
    callback(posts);
  });
};

module.exports.getPostById = (_id, callback) => {
  console.log(_id);
  Post.find({_id}, function (err, postArr) {
    assert.strictEqual(null, err);
    console.log('mongoose operation success - got post', postArr);
    callback(postArr[0]);
  });
};

module.exports.deletePostById = (_id, callback) => {
  Post.deleteOne({_id}, function (err, post) {
    assert.strictEqual(null, err);
    console.log('mongoose operation success - post delete', post);
    callback(post);
  });
};
