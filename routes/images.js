const express = require('express');
const router = express.Router();
const dataService = require('../data/data.db.service');

router
  .get('/:name', function (req, res, next) {
    dataService.getImageByName(req.params.name,(file) => {
      res.send(new Buffer(file, 'binary'));
    });
  })

module.exports = router;
