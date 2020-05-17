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
                    lon: document.lon,
                    comment: document.comment
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
    //search query
    var query = {bayid:req.query.searchItem};
    parking.find(query).then((documents) => {
        // create context Object with 'usersDocuments' key
        const context = {
            allParkingBays: documents.map((document) => {
                return {
                    bayid: document.bayid,
                    status: document.status,
                    lat: document.lat,
                    lon: document.lon,
                    comment: document.comment
                };
            })
        };
        console.log(context);
        res.render('parkMeResult', {
            parking: context.allParkingBays
        });
    });

}

const submitComment = (req,res)=>{

    //select all where bayid is req.query.bayid
    var getBayId = {bayid:req.query.bayid};

    //update comment query
    var updateComment = {$set:{comment:req.query.commentStr}};

    parking.updateOne(getBayId,updateComment,function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        parking.close
        }
    )

    //reload current page
    res.redirect("back")
};

const getNearbyParking = (req,res)=>{
    const apiKey = "GCKALRJbp5GlFkSPRqfudXtTAHblG98b";
    //assume that user input is in form: "lat,lon"
    const lat = req.query.searchItem.split(",")[0];
    const lon = req.query.searchItem.split(",")[1];

    parking.find({}).then((documents) => {
        // create context Object with 'usersDocuments' key
        const context = {
            allParkingBays: documents.map((document) => {
                return {
                    bayid: document.bayid,
                    status: document.status,
                    lat: document.lat,
                    lon: document.lon,
                    comment: document.comment
                };
            })
        };
        let data = context.allParkingBays;
        //Each pair of (lat,lon) is regarded as a point
        //distSquare is squared Euclidean distance of the point user input and each point in database
        //sort data in ascending order according to distSquare
        data.sort(function (a, b) {
            var distSquareA = (lat - a.lat) ** 2 + (lon - a.lon) ** 2;
            var distSquareB = (lat - b.lat) ** 2 + (lon - b.lon) ** 2;
            return distSquareA - distSquareB;
        });
        
        res.render('parkMeResult', {
            parking: data
        });

    });
};


module.exports = {
    getAllParking,
    getParkingById,
    submitComment,
    getNearbyParking
};