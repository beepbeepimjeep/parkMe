const express = require("express");
const parkingRouter = express.Router();

const parkingController = require("../controllers/parkingController.js");

//get all parking result route
parkingRouter.get("/", parkingController.getAllParking);

//search single bay
parkingRouter.get("/searchId",
    parkingController.getParkingById);

//add comment to a car park
parkingRouter.get("/add", parkingController.submitComment
);

//search by address route
parkingRouter.get("/searchAddress",parkingController.getNearbyParking);

module.exports = parkingRouter;

