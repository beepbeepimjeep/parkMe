const mongoose = require("mongoose");
const Request = require("request");
const fetch = require('node-fetch');
const parking = mongoose.model("parkingResult");
const parkinglot = mongoose.model("parkinglot")

const singleParkingLot = async (req,res)=>{
    var query = {parkinglot_id:req.query.parkIdRes};
    await parkinglot.find(query).then((document)=>{
        const context = {
            parkinglotRes: document.map((document)=>{
                return {
                    lotname: document.lotname,
                    address: document.address,
                    contactnumber: document.contactnumber,
                    lat: document.lat,
                    lon: document.lon,
                    link: document.link
                };
            })
        }
        res.render('singleParkingLot', {
            parking: context.parkinglotRes
        });
    })

}
const nearByParkingLot=(req,res)=>{
    var lat = req.query.addrInLat;
    console.log(lat);
    var lon = req.query.addrInLng;
    console.log(lon);
    parkinglot.find({}).then((document)=>{
        const context = {
            parkinglotResult: document.map((document)=>{
                return{
                    lotname: document.lotname,
                    address: document.address,
                    contactnumber: document.contactnumber,
                    lat: document.lat,
                    lon: document.lon,
                    id: document.parkinglot_id
                };
            })
        }
        let data = context.parkinglotResult;
        data.sort(function (a, b) {
            var distSquareA = (lat - a.lat) ** 2 + (lon - a.lon) ** 2;
            var distSquareB = (lat - b.lat) ** 2 + (lon - b.lon) ** 2;
            return distSquareA - distSquareB;
        });
        res.render('parkinglotResult',{plot:data})
    })
}
const update = (req,res) => {
    const apiKey = "GCKALRJbp5GlFkSPRqfudXtTAHblG98b";
    const melbDb = "https://data.melbourne.vic.gov.au/resource/vh2v-4nfs.json?$limit=5000";
    const reverseGeo = "https://www.mapquestapi.com/geocoding/v1/reverse?key=GCKALRJbp5GlFkSPRqfudXtTAHblG98b";
    fetch(melbDb)
        .then(function (res) {
                return res.json()
            }
        )
        .then(function (json) {
            parking.collection.deleteMany({});
            console.log(json.length);
            for(var i=0; i<json.length; i++){
                var singleResult = json[i];
                //addressStr = json.results[0].locations[0].street;
                //console.log(addressStr)
                //console.log(addressStr)
                var firstInsert = {bayid: singleResult.bay_id, status: singleResult.status, lat: singleResult.location.latitude, lon: singleResult.location.longitude, address: '',comment: "no comment"}
                var updateBayid = {$set: {bayid: singleResult.bay_id}};
                var updateStatus = {$set: {status: singleResult.status}};
                var updateLat = {$set: {lat: singleResult.location.latitude}};
                var updateLon = {$set: {lon: singleResult.location.longitude}};
                parking.insertMany(firstInsert, function (err, res) {
                    if(err) throw err;
                    parking.close
                })
            }
        })
        .catch(function (error) {
            console.log(error)
    })
    res.redirect("back");
}


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
const getParkingById = async (req,res,callback)=>{
    //search query
        var query = {bayid:req.query.searchItem};
        async function getAddress(query, callback){
            fetch(query)
                .then(function (res) {
                    return res.json();
                }).then(function (json) {
                parking.updateOne({bayid:req.query.searchItem},{$set:{address:json.results[0].locations[0].street}},function (err,res) {
                    if(err) throw err;
                    address = json.results[0].locations[0].street;
                    callback(address);
                    console.log("fetch address is :"+address)
                    parking.close;
                    return address;
                })
            })
        }
        function addressResult(address){
            console.log("callback:"+address)
            return address;
        }
        /*parking.find(query,function (err,res) {
            if(err) throw err
            var revGeoUrl = "https://www.mapquestapi.com/geocoding/v1/reverse?key=r6mEXWAdpohbgJyspF2GP1GOPoRiMYEc&location="+
                res[0].lat+","+res[0].lon+"&includeRoadMetadata=true&includeNearestIntersection=true";
            var address='';
            fetch(revGeoUrl)
                .then(function (res) {
                    return res.json();
                }).then(function (json) {
                parking.updateOne({bayid:req.query.searchItem},{$set:{address:json.results[0].locations[0].street}},function (err,res) {
                    if(err) throw err;
                    address = json.results[0].locations[0].street;
                    console.log("address update to: "+json.results[0].locations[0].street)
                    parking.close;
                }).callback(address)
            })
            const context = {
                return:{
                    bayid: res[0].bayid,
                    status: res[0].status,
                    address: parking.find(query)[0].locations[0].street,
                    comment: res[0].comment
                }
            }
            console.log(context);
            res.render('parkMeResult', {
                parking: context})
        })*/
        await parking.find(query).then((documents) => {
            // create context Object with 'usersDocuments' key
            var revGeoUrl = "https://www.mapquestapi.com/geocoding/v1/reverse?key=r6mEXWAdpohbgJyspF2GP1GOPoRiMYEc&location="+
                documents.valueOf()[0].lat+","+documents.valueOf()[0].lon+"&includeRoadMetadata=true&includeNearestIntersection=true";
            getAddress(revGeoUrl,addressResult);
            const context = {
                allParkingBays: documents.map((document) => {

                    /*fetch(revGeoUrl,callback)
                        .then(function (res) {
                            return res.json();
                        }).then(function (json) {
                        parking.updateOne({bayid:req.query.searchItem},{$set:{address:json.results[0].locations[0].street}},function (err,res) {
                            if(err) throw err;
                            address = json.results[0].locations[0].street;
                            callback(address);
                            console.log("fetch address is :"+address)
                            parking.close;
                        })
                    })*/
                    console.log("address is:"+document.address);

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
    //get the lat and lon from the form
    var lat = req.query.addrInLat;
    var lon = req.query.addrInLng;


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
    getNearbyParking,
    update,
    nearByParkingLot,
    singleParkingLot
};