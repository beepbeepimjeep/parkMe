const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
require('./models');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

//connect to db
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

//setting for heroku port
var PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.render('parkMe');
});

const parkingRouter = require("./routes/parkingRouter");

app.use("/parking",parkingRouter);

app.listen(PORT,()=>{
    console.log('app on port '+PORT);
});
