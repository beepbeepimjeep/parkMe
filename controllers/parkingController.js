const mongoose = require("mongoose");

const test = [
    {
        bayid:"0001",
        status:"Present",
        lat:"-37.81081371806565",
        lon:"144.95302970099428"
    },
    {
        bayid:"0002",
        status:"Present",
        lat:"-37.807200995578604",
        lon:"144.95365553170808"
    }
]
const parking = mongoose.model("parkingResult");

const getAllParking = async (req, res) => {
    try {

        await parking.find({}).then((documents) => {
    // create context Object with 'usersDocuments' key
        const context = {
            allParkingBays: documents.map((document) => {
                return {
                    bayid: document.bayid,
                    status: document.status,
                    lat: document.lat,
                    lon: document.lon
                };
            })
        };

        res.render('parkMeResult', {
            parking: context.allParkingBays
        });
    });
    } catch (err) {
        console.log(err);
        res.status(400);
        return res.send('Database query failed');
    }
    };

/*const getParkingById = (req, res) => {
    const parking = parkings.find(parking => parking.bayid === req.params.id);
    if(parking){
        res.send(parking);
    }else{
        res.send("No parking bay by that ID");
    }
};*/

module.exports = {
    getAllParking
    //getParkingById
};