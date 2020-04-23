const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    res.send("<H1>park me</H1>");
});

const parkingRouter = require("./routes/parkingRouter");

app.use("/parking",parkingRouter);

app.listen(3000,()=>{
   console.log("app on port 3000");
});