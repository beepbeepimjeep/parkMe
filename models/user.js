const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userID: Number,
    firstname: String,
    lastname: String,
    email: String,
    password: String
});
const user = mongoose.model("user", userSchema, "user");
module.exports = user;