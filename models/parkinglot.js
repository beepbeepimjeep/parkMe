const mongoose = require("mongoose");
const parkinglotSchema = new mongoose.Schema({
    parkinglot_id: Number,
    lotname: String,
    address: String,
    contactnumber: Number,
    lat: Number,
    lon: Number,
    link: String,
    comment: []
});
const parkinglot = mongoose.model("parkinglot", parkinglotSchema, "parkinglot");
module.exports = parkinglot;