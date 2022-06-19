const mongoose = require("mongoose");

const schema = new mongoose.Schema({    // <TODO> I would like to also associate Devices with Sessions (or used credentials), so I can analyze from which devices has a credential been used from, and when
    // <TODO> identification
    unstableMAC: {
        type: String,
        required: false
    },
    hardwareID: {   // how to do this ?
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: true
    },

    // <TODO> history
    usedIPv4: {
        type: Array,
        required: false
    },
    lastDateIPv4: {
        type: Array,
        required: false
    }

}, {
    timestamps: true,
    id: true
});
const Device = mongoose.model("device", schema);

module.exports = { Device };