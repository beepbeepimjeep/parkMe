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

const getNearbyParkingBay = (req, res) => {
    const lat = req.params.lat;
    const lon = req.params.lon;
    var distInfo = [];
    var i;
    for (i=0; i<parkings.length; i++){
	var distSquare = (lat-parkings[i].lat)**2+(lon-parkings[i].lon)**2;
	var info = {index: i, dist: distSquare};
	distInfo.push(info);
    }
    distInfo.sort(function(a,b){return a.dist-b.dist});
    var result = [];
    for (i=0; i<parkings.length; i++){
	result.push(parkings[distInfo[i].index]);
    }
    
    res.send(result);
};

module.exports = {
    getAllParking,
    getParkingById,
    getNearbyParkingBay
};