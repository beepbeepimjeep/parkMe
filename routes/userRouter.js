const express = require("express");
const bodyParser = require("body-parser");
const userRouter = express.Router();

const userController = require("../controllers/userController.js");

userRouter.use(bodyParser.urlencoded({extended: true}));

userRouter.get("/login",userController.login);
userRouter.get("/signup", userController.signup);

userRouter.post("/signup", function(req, res){
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    userController.addUser(firstname, lastname, email, password);
    res.redirect('/');
})

module.exports = userRouter;