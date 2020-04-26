const mongoose = require("mongoose");

// import author model
const parking = mongoose.model("parking");
const getAllParking = async (req, res) => {

    try {
        const all_parking = await parking.find();
        return res.send(all_parking);
    } catch (err) {
        res.status(400);
        return res.send("Database query failed");
    }
};

const getParkingById = (req, res) => {
    const parking = parkings.find(parking => parking.bayid === req.params.id);
    if(parking){
        res.send(parking);
    }else{
        res.send("No parking bay by that ID");
    }
};

module.exports = {
    getAllParking,
    getParkingById
};