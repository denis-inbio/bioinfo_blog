const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    GET: {
        type: Number,
        required: false
    },
    POST: {
        type: Number,
        required: false
    },
    PUT: {
        type: Number,
        required: false
    },
    DELETE: {
        type: Number,
        required: false
    },
    OPTIONS: {
        type: Number,
        required: false
    },

}, {
    timestamps: true,
    id: true
});
const UrlTraffic = mongoose.model("urlTraffic", schema);

const VALIDATE_REPAIR_UrlTraffic = (urlTraffic) => {
    if( urlTraffic["GET"] ) {}
    else { urlTraffic["GET"] = 0; }

    if( urlTraffic["POST"] ) {}
    else { urlTraffic["POST"] = 0; }

    if( urlTraffic["PUT"] ) {}
    else { urlTraffic["PUT"] = 0; }

    if( urlTraffic["DELETE"] ) {}
    else { urlTraffic["DELETE"] = 0; }

    if( urlTraffic["OPTIONS"] ) {}
    else { urlTraffic["OPTIONS"] = 0; }

    return urlTraffic;
};

module.exports = { UrlTraffic, VALIDATE_REPAIR_UrlTraffic };