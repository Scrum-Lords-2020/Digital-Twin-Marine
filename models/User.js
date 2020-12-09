const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    vessels: {
        type: Map,
        of: Number,
        required: true
    },
    // Map for vessels and user levels, 0-highest level,2-lowest level
});

module.exports = User = mongoose.model("users", UserSchema);