const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRouter = express.Router();

const userController = require("../controllers/userController.js");
const { body, validationResult } = require('express-validator');
// const {
//   userValidationRules,
//   validate,
// } = require("../controllers/validator.js");

userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.get("/login", userController.login);
userRouter.get("/signup", userController.signup);

userRouter.post("/signup",[
    body('email', "invalid email").not().isEmpty(),
    body('password', "must at least 3 digits").not().isEmpty().isLength({ min: 3 })
],function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('back');
        return res.status(422).jsonp(errors.array());
      } else {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let password = req.body.password;
        userController.addUser(
          firstname,
          lastname,
          email,
          password,
          userController.assignID
        );
        res.redirect("/");
        
      }
    }

);

userRouter.post("/login", userController.signUser);


module.exports = userRouter;
