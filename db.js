var mongoose = require('mongoose');

const uri = mongodb+srv://skyler_chen:<password>@cluster0-gayyw.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect(uri,
    function(err){
    if(!err){
        console.log('Connected to mongodb.')
    }else{
        console.log('Failed to connect to mongo!',err);
    }
    });

require('./user.js');
