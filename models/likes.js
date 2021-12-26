
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// const currentDate = moment().format("LLLL");

const likeSchema = new Schema ({
    likes: {
        likeUser: {
            type: String
        },
        likeTimes: {
            type: Number
        },
        date: {
            type: String,
            default: moment().format("LLLL")
        }
    }
});

const Like = new mongoose.model("Like", likeSchema);
module.exports = Like;