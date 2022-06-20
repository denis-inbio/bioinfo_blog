const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    visits: {
        type: Number,
        required: true
    },

}, {
    timestamps: true,
    id: true
});
const IPTraffic = mongoose.model("ipTraffic", schema);

const VALIDATE_REPAIR_IpTraffic = (ipTraffic) => {
    if( ipTraffic["visits"] ) {}
    else { ipTraffic["visits"] = 0; }

    return ipTraffic;
};

module.exports = { IPTraffic, VALIDATE_REPAIR_IpTraffic };