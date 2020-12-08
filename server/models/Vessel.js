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
        type: String
    }

    //Need entry to save the actual vessel, not sure what file type
    //May be able to stores associated files in array here
});

module.exports = Vessel = mongoose.model("vessels", VesselSchema);