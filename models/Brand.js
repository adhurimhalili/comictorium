const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Brand', BrandSchema);
