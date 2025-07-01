var Brand = require('../models/Brand');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



router.get('/', function(req, res, next) {
    Brand.find(function (err, brand) {
      if (err) return next(err);
      res.json(brand);
    });
  });
  

router.get('/:id', function(req, res, next) {
    Brand.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.post('/', function(req, res, next) {
    Brand.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Brand.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  

router.delete('/:id', function(req, res, next) {
    Brand.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;
