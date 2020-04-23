const express = require("express");

const app = express();

app.get("/",(req,res)=>{

});

const parkingRouter = require("./routes/parkingRouter");

app.use("/parking",parkingRouter);

app.listen(3001,()=>{
   console.log("app on port 3001");
});