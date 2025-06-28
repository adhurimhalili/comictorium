var Quotes = require('../models/Quotes');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var multer = require('multer');
var fs = require('fs');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../static/images/')
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.indexOf(".") + 1);
    cb(null, file.fieldname + '-' + Date.now() + "." + ext)
  }
});
var upload = multer({
  storage: storage
});

/* GET ALL products */
router.get('/', function(req, res, next) {
    Quotes.find(function (err, quotes) {
      if (err) return next(err);
      res.json(quotes);
    });
  });
  
/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
    Quotes.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* SAVE PRODUCT 
router.post('/', function(req, res, next) {
  Products.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });*/

  router.post('/', upload.single('image'),
    function (req, res) {
      let quotes = req.body;
      quotes.author = req.body.author
      quotes.image = req.body.image != 'undefined' ? req.file.filename : null
      quotes.description = req.body.description
      Quotes.create(quotes, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    
  });

  /* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Quotes.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
    Quotes.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;
