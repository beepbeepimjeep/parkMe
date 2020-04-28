const express = require("express");
const parkingRouter = express.Router();

const parkingController = require("../controllers/parkingController.js");
parkingRouter.get("/", parkingController.getAllParking);

//parkingRouter.get("/:id",parkingController.getParkingById);


parkingRouter.get("/search",
    parkingController.getParkingById);

module.exports = parkingRouter;