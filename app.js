const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();

//header for all pages
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+'/html/parkMeMain.html'));
});

const parkingRouter = require("./routes/parkingRouter");

app.use("/parking",parkingRouter);

app.listen(PORT,()=>{
   console.log('app on port '+PORT);
});