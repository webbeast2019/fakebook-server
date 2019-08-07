const express = require('express');
const router = express.Router();
const dataService = require('../data/data.service');
const multer = require('multer');

// get file name based on file object and data next-entry-id
const generatePostFileName = (file) => `post${dataService.getNextEntryId()}.${file.mimetype.split('/')[1]}`;

const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    cb(null, generatePostFileName(file))
  }
});
const upload = multer({storage: storage});


/* GET users listing. */
router
  .get('/', function (req, res, next) {
    res.send(dataService.data);
  })
  .get('/:id', function (req, res, next) {
    const entryId = parseInt(req.params.id);
    res.send(dataService.data.find(p => p.id === entryId));
  })
  .post('/', upload.single('image'), function (req, res, next) {
    const entryData = req.body;
    if(req.file) {
      entryData['image'] = generatePostFileName(req.file);  // add file name to post data
    }
    const newEntry = dataService.createEntry(entryData);
    res.send(newEntry);
  })
  .put('/:id', upload.single('image'), function (req, res, next) {
    const entryId = parseInt(req.params.id);
    const entryData = {...req.body, id: parseInt(req.body.id)};
    if (entryData.id !== entryId) {
      res.status(400).end(); // bad request
    } else {
      const updatedEntry = dataService.updateEntry(entryId, entryData);
      res.send(updatedEntry);
    }
  })
  .delete('/:id', function (req, res, next) {
    const entryId = parseInt(req.params.id);
    const foundAndDeleted = dataService.deleteEntry(entryId);
    const statusCode = (foundAndDeleted) ? 200 : 400;
    res.status(statusCode).end();
  });


module.exports = router;
