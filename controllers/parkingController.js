var parkings = require("../models/parking");

const getAllParking = (req, res) => {
    res.send(parkings);
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