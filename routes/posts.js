const express = require('express');
const router = express.Router();
const dataService = require('../data/data.service');

/* GET users listing. */
router
  .get('/', function (req, res, next) {
    res.send(dataService.data);
  })
  .get('/:id', function (req, res, next) {
    const entryId = parseInt(req.params.id);
    res.send(dataService.data.find(p => p.id === entryId));
  })
  .post('/', function (req, res, next) {
    const entryData = req.body;
    const newEntry = dataService.createEntry(entryData);
    res.send(newEntry);
  })
  .put('/:id', function (req, res, next) {
    const entryId = parseInt(req.params.id);
    const entryData = req.body;
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
