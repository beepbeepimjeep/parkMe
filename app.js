const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
require('./models');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use(cookieParser());
app.use(session({
    secret: 'positronx',
    saveUninitialized: false,
    resave: false
}))
//connect to db
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

//setting for heroku port
var PORT = process.env.PORT || 3000;

app.get("/map",(req,res)=>{
    res.render('parkBayNavi');
const userController = require("./controllers/userController.js");

app.get("/",(req,res)=>{
    res.render('parkMe',{
        user: userController.getuserName
    });
});

const parkingRouter = require("./routes/parkingRouter");
const userRouter = require("./routes/userRouter");

app.use("/parking",parkingRouter);
app.use("/user",userRouter);
app.listen(PORT,()=>{
    console.log('app on port '+PORT);
});
