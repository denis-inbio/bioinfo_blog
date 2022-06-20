const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    protocol: {
        type: String,
        required: false // <TODO> has to be changed to true in the next revision
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

const VALIDATE_REPAIR_HttpUrlTraffic = (urlTraffic) => {
    urlTraffic["protocol"] = "http";

    if( urlTraffic["GET"] ) {}
    else { urlTraffic["GET"] = 0; }

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

const VALIDATE_REPAIR_HttpSslUrlTraffic = (urlTraffic) => {
    urlTraffic["protocol"] = "https";

    if( urlTraffic["GET"] ) {}
    else { urlTraffic["GET"] = 0; }

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

const VALIDATE_REPAIR_WebsocketUrlTraffic = (urlTraffic) => {
    urlTraffic["protocol"] = "websocket";

    if( urlTraffic["GET"] ) {}
    else { urlTraffic["GET"] = 0; }

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

module.exports = { UrlTraffic, VALIDATE_REPAIR_HttpUrlTraffic, VALIDATE_REPAIR_HttpSslUrlTraffic, VALIDATE_REPAIR_WebsocketUrlTraffic };