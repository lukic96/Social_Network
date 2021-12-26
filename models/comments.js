
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// const currentDate = moment().format("LLLL");

const commSchema = new Schema ({
    comment: {
        commUser: {
            type: String
        },
        commMaterial: {
            type: String
        },
        date: {
            type: String,
            default: moment().format("LLLL")
        },
    }
});

const Comment = new mongoose.model("Comment", commSchema);
module.exports = Comment;