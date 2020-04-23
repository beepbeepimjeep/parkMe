const express = require("express");

const app = express();

var PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("<H1>park me</H1>");
});

const parkingRouter = require("./routes/parkingRouter");

app.use("/parking",parkingRouter);

app.listen(PORT,()=>{
   console.log("app on port "+PORT);
});