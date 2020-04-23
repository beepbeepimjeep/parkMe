const express = require("express");

const parkingRouter = express.Router();

const parkingController = require("../controllers/parkingController");

parkingRouter.get("/",parkingController.getAllParking);

parkingRouter.get("/:id",parkingController.getParkingById);

module.exports = parkingRouter;