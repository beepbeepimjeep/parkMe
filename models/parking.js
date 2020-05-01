
const mongoose = require("mongoose");
const parkingSchema = new mongoose.Schema({
    bayid: Number,
    status: String,
    lat: String,
    lon: String
});
const parking = mongoose.model("parkingResult", parkingSchema, "parkingResult");
module.exports = parking;