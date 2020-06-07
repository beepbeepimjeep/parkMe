const mongoose = require("mongoose");
const user = mongoose.model("user");
var userName = "guest";
const bcrypt = require('bcrypt');
const saltRounds = 10;

function assignID(){
    var id;
    user.collection.findOne({}, {sort:{$natural:-1}}, function(err, user){
        id = user.userID;
        id++;
    })
    return id;

}

function addUser(firstname, lastname, email, password, callback){   
    let id = callback();
    bcrypt.hash(password, saltRounds, function(err, hash) {
        user.collection.insertOne({
            userID: id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash
        })
    });
    
    userName = lastname;

}  

const signUser = (req, res)=>{
    user.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log(err);
        }else if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result){
                    userName = user.lastname;
                    res.redirect('/');
                }else{
                    res.render("check", {check: "Invalide password"});
                }
            });
        }
        else{
            res.render("check", {check: "Invalid email"});
        }
    })

}


const login = (req, res)=>{
    res.render("login",{
        user: userName,
    });
}


const signup = (req, res)=>{
    res.render("signup", {
        user: userName,
    });
}




function getuserName(){
    return userName;
}

function getAuth(){
    return auth;
}

function setUserName(userName){
    userName = userName;
}

module.exports = {
    login,
    signup,
    addUser,
    assignID,
    signUser,
    getuserName,
    setUserName,
    getAuth

}