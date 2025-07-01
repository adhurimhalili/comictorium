const mongoose = require('mongoose');

const HomeSchema = mongoose.Schema({
    email:String,
});
module.exports = mongoose.model('Admin', HomeSchema);