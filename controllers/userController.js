const mongoose = require("mongoose");
const user = mongoose.model("user");
var userName = "guest";

function addUser(firstname, lastname, email, password){
    user.collection.insertOne({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })
}

function signUser(email, password){
    user.findOne({email:email, password:password}, function(err,user){
        //console.log(user);
        if(!user){
            return false;
        }
        else{
            userName = email;
            return true;
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
        user: userName
    });
}

function getuserName(){
    return userName;
}

module.exports = {
    login,
    signup,
    addUser,
    signUser,
    getuserName,

}