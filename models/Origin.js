const mongoose = require('mongoose');

const OriginSchema = mongoose.Schema({
    name: String,
    description:String,
    updated_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Origin', OriginSchema);