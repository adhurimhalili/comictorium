const mongoose = require('mongoose');

const HomeSchema = mongoose.Schema({
    author:String,
    title:String,
    category:String,
    year:Number,
    isbn:Number,
    price:Number,
    image:String,
    description:String,
    isDeleted:{ type:Boolean, default:false},
    updated_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Books', HomeSchema);