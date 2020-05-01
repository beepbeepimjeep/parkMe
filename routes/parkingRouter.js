const express = require("express");
const parkingRouter = express.Router();

const parkingController = require("../controllers/parkingController.js");
parkingRouter.get("/", parkingController.getAllParking);

//parkingRouter.get("/:id",parkingController.getParkingById);


parkingRouter.get("/search",
    parkingController.getParkingById);

parkingRouter.get("/add", parkingController.submitComment
);

module.exports = parkingRouter;

