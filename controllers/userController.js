const mongoose = require("mongoose");
const user = mongoose.model("user");

function addUser(firstname, lastname, email, password){
    user.collection.insertOne({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    })
}

const login = (req, res)=>{
    res.render("login");
}

const signup = (req, res)=>{
    res.render("signup");
}

module.exports = {
    login,
    signup,
    addUser
}