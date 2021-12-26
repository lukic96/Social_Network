
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstname: {
        type: String,
        
    },
    lastname: {
        type: String,
        
    },
    username: {
        type: String,
        
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
});

const User = new mongoose.model("User", userSchema);
module.exports = User;