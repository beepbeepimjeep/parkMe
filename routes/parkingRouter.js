const express = require("express");
const parkingRouter = express.Router();

const parkingController = require("../controllers/parkingController.js");
parkingRouter.get("/", parkingController.getAllParking);


    //console.log(parking);;





//parkingRouter.get("/:id",parkingController.getParkingById);

parkingRouter.get("/:addcommment",(req,res)=>{
    /*const data = {
        userid: "0001",
        comment: "i like it"
    }
    let {userid, comment} = data;*/
});

module.exports = parkingRouter;