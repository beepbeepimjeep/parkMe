const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
require('./models');

//header for all pages
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//connect to db
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name


var PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send('index')
});

const parkingRouter = require("./routes/parkingRouter");

app.use("/parking",parkingRouter);

app.listen(PORT,()=>{
   console.log('app on port '+PORT);
});