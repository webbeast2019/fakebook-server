const express = require('express');
const router = express.Router();
const dataService = require('../data/data.db.service');
const validationService = require('../validation.service');
const multer = require('multer');

// get file name based on file object
const generatePostFileName = (file) => {
  const name = file.originalname.includes('.') ? file.originalname.split('.')[0] : file.originalname;
  const ext = file.mimetype.split('/')[1];
  const hash = Math.random().toString(36).substr(2) + (+new Date).toString(36);
  return `${name}_${hash}.${ext}`;
};
// let nextFileName;

// const storage = multer.diskStorage({
//   destination: 'images/',
//   filename: (req, file, cb) => {
//     nextFileName = generatePostFileName(file);
//     cb(null, nextFileName)
//   }
// });
const storage = multer.memoryStorage();
const upload = multer({storage: storage});


/* GET users listing. */
router
  .get('/', function (req, res, next) {
    dataService.getAllPosts((posts) => res.send(posts));
  })
  .get('/:id', function (req, res, next) {
    dataService.getPostById(req.params.id,(post) => res.send(post));
  })
  .post('/', upload.single('image'), function (req, res, next) {
    const validation = validationService.validate(req.body);
    const entryData = getEntryData(req);

    if(validation.error) {
      res.status(400).send({error: validation.errorMessages})
    } else {
      dataService.creatPost(entryData, (newEntry) => {
        res.send(newEntry);
      });
    }
  })
  .put('/:id', upload.single('image'), function (req, res, next) {
    const postId = req.params.id;
    const validation = validationService.validate(req.body);
    const entryData = getEntryData(req);

    if (entryData._id !== postId) {
      res.status(400).end(); // bad request
    }
    if(validation.error) {
      res.status(400).send({error: validation.errorMessages})
    } else {
      dataService.updatePostById(postId, entryData, (updatedEntry) => {
        res.send(updatedEntry);
      });
    }
  })
  .delete('/:id', function (req, res, next) {
    const postId = req.params.id;
    dataService.deletePostById(postId, (foundAndDeleted) => {
      const statusCode = (foundAndDeleted) ? 200 : 400;
      res.status(statusCode).end();
    });
  });

function getEntryData(req) {
  const entryData = {...req.body};
  if(req.file) {
    entryData['image'] = generatePostFileName(req.file);  // add file name to post data
    entryData['imageFile'] = req.file.buffer;  // add file to post data
  }
  return entryData;
}

module.exports = router;
