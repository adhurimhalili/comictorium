
const mongoose = require('mongoose');

const PostsSchema = mongoose.Schema({
    emri: String,
    koha:String,
    cmimi:String,
});
module.exports = mongoose.model('Posts', PostsSchema);