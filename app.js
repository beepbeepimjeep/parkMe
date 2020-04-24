const express = require("express");

const app = express();
const path = require("path");

var PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+'/html/parkMeMain.html'));
});

const parkingRouter = require("./routes/parkingRouter");

app.use("/parking",parkingRouter);

app.listen(PORT,()=>{
   console.log("app on port "+PORT);
});