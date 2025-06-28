var Messages = require('../models/Messages');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


/* GET ALL Contacts */
router.get('/', function(req, res, next) {
  Messages.find(function (err, messages) {
      if (err) return next(err);
      res.json(messages);
    });
  });
  
/* GET SINGLE Contacts BY ID */
router.get('/:id', function(req, res, next) {
  Messages.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* SAVE Contacts */
router.post('/', function(req, res, next) {
  Messages.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* UPDATE Contacts */
router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Messages.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE Contacts */
router.delete('/:id', function(req, res, next) {
  Messages.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;
