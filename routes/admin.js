var Admin = require('../models/Admin');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



router.get('/', function(req, res, next) {
    Admin.find(function (err, admin) {
      if (err) return next(err);
      res.json(admin);
    });
  });
  

router.get('/:id', function(req, res, next) {
    Admin.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.post('/', function(req, res, next) {
    Admin.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Admin.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  

router.delete('/:id', function(req, res, next) {
    Admin.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;