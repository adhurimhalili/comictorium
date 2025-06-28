var Books = require('../models/Books');
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
  Books.find(function (err, books) {
      if (err) return next(err);
      res.json(books);
    });
  });
  
/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
  Books.findById(req.params.id, function (err, post) {
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
      let books = req.body;
      books.author = req.body.author
      books.title = req.body.title
      books.year = req.body.year
      books.isbn = req.body.isbn
      books.price = req.body.price
      books.category = req.body.category
      books.image = req.body.image != 'undefined' ? req.file.filename : null
      books.description = req.body.description
      Books.create(books, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    
  });

  /* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Books.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
  Books.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;
