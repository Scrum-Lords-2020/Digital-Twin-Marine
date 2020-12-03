const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VesselSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    IMO: {
        type: Number,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    model: {
        type: String,
    }
});

module.exports = Vessel = mongoose.model("vessels", VesselSchema);