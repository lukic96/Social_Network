
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// const currentDate = moment().format("LLLL");

const dislikeSchema = new Schema ({
    dislike: {
        dislikeUser: {
            type: String
        },
        dislikeTimes: {
            type: Number
        },
        date: {
            type: String,
            default: moment().format("LLLL")
        }
    }
});

const Dislike = new mongoose.model("Dislike", dislikeSchema);
module.exports = Dislike;