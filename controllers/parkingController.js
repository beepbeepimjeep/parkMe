const mongoose = require("mongoose");

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

const getParkingById = (req,res)=>{
    var query = {bayid:req.query.searchItem};
    parking.find(query).then((documents) => {
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
        console.log(context);
        res.render('parkMeResult', {
            parking: context.allParkingBays
        });
    });

}



module.exports = {
    getAllParking,
    getParkingById
};