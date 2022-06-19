const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    download_href_3lib: {
        type: String,
        required: true
    },
    view_href_3lib: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        required: true
    },

    publisher: {
        type: String,
        required: true
    },

    pages: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    edition: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    file_format: {
        type: String,
        required: true
    },

    file_size: {
        type: String,
        required: true
    },
}, {
    id: true,
    timestamps: true,
});

const ResourceHyperReference = mongoose.model("resourceHyperReference", schema);
module.exports = {ResourceHyperReference};