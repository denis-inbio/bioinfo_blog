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

module.exports = { IPTraffic };