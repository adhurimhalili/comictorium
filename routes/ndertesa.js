var Ndertesa = require('../models/Category');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



router.get('/', function(req, res, next) {
    Ndertesa.find(function (err, category) {
      if (err) return next(err);
      res.json(category);
    });
  });


router.get('/:id', function(req, res, next) {
    Ndertesa.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.post('/', function(req, res, next) {
    Ndertesa.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Ndertesa.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.delete('/:id', function(req, res, next) {
    Ndertesa.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;