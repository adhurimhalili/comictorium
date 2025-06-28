var Posts = require('../models/Posts');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



router.get('/', function(req, res, next) {
    Posts.find(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
  });
  

router.get('/:id', function(req, res, next) {
    Posts.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.post('/', function(req, res, next) {
    Posts.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Posts.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  

router.delete('/:id', function(req, res, next) {
    Posts.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;
