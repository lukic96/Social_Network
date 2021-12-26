
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// const currentDate = moment().format("LLLL");

const envSchema = new Schema ({
    post: {
        postUser: {
            type: String
        },
        postMaterial: {
            type: String
        },
        date: {
            type: String,
            default: moment().format("LLLL")
        },
    }
});

const Env = new mongoose.model("Env", envSchema);
module.exports = Env;