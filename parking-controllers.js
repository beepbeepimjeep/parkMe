var mongoose = require('mongoose');
var Parking = mongoose.models('parkings');

var findAllParkings = function(req, res, next) {
    Parking.find()
        .lean()
        .then(function(doc) {
            res.render('index', {items: doc});
        });
};

var createParking = function(req, res, next) {
    var item = {
        parkingtype:req.body.parkingtype,
        address:req.body.address,
        duration:req.body.duration,
        cost:req.body.cost,
        comment:req.body.comment
    };

    var data = new Parking(item);
    data.save();

    res.redirect('/');
};

var updateParking = function(req, res, next) {
    var id = req.body.id;

    Parking.findById(id, function(err, doc) {
        if (err) {
            console.error('sorry, no parking has been found');
        }
        doc.parkingtype = req.body.parkingtype;
        doc.address = req.body.address;
        doc.duration = req.body.duration;
        doc.cost = req.body.cost;
        doc.comment = req.body.comment;
        doc.save();
    });
    res.redirect('/');
};

var deleteParking = function(req, res, next) {
    var id = req.body.id;
    Parking.findByIdAndRemove(id).exec();
    res.redirect('/');
};

module.exports.findAllParking = findAllParkings();
module.exports.createParking = createParking();
module.exports.updateParking = updateParking();
module.exports.deleteParking = deleteParking();