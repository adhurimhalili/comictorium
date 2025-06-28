var Orders = require('../models/Orders');
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
    Orders.find(function (err, orders) {
      if (err) return next(err);
      res.json(orders);
    });
  });
  
/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
    Orders.findById(req.params.id, function (err, post) {
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
      let orders = req.body;
      orders.prodid = req.body.prodid
      orders.userid = req.body.userid
      orders.adresa = req.body.adresa
      orders.posta = req.body.posta
      orders.emri = req.body.emri
      orders.phonenumber = req.body.phonenumber
      orders.zip = req.body.zip
      Orders.create(orders, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    
  });

  /* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
    console.log(req.body);
    Orders.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
    Orders.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  module.exports = router;
