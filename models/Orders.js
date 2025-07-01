const mongoose = require('mongoose');

const HomeSchema = mongoose.Schema({
    prodid:String,
    userid:String,
    emri:String,
    adresa:String,
    phonenumber:String,
    posta:String,
    zip:String,
    status:{ type: Number, default: 0 },
    dataerezervimit: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Orders', HomeSchema);