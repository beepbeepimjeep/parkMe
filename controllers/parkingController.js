const mongoose = require("mongoose");

const parking = mongoose.model("parkingResult");

//
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


module.exports = {
    getAllParking,
    getParkingById,
    submitComment
};