const express = require('express');
const router = express.Router();
const dataService = require('../data/data.service');

/* GET users listing. */
router
    .get('/', function (req, res, next) {
        res.send(dataService.data);
    })
    .get('/:id', function (req, res, next) {
        res.send(dataService.data);
    })
    .post('/', function (req, res, next) {
      const newEntry = dataService.createEntry(req.body);
      res.send(newEntry);
    })
    .put('/:id', function (req, res, next) {
      dataService.updateEntry(req.body);
      res.send(dataService.data);
    });

module.exports = router;
