var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = [
    {
        "id":"10001",
        "first_name":"",
        "last_name":"",
        "phone_number":"",
        "email_address":"",
        //offer coupon to users/subscribers in their month of birthday
        "birthday":"",
        //ask user to leave some comments(optional)
        "review":"",
    },
    {
        "id":"10002",
        "first_name":"",
        "last_name":"",
        "phone_number":"",
        "email_address":"",
        //offer coupon to users/subscribers in their month of birthday
        "birthday":"",
        //ask user to leave some comments(optional)
        "review":"",
    };
];

//list the information of parking
var userSchema = new Schema({
    //define it is rather a parking lot or bay
    parkingtype: {type: String, required: true},
    bayid: String,
    address: String,
    duration: String,
    cost: String,
    comment: String,
}, {collection: 'Users'});

mongoose.model('users', userSchema);