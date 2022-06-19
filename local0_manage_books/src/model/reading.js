const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    md5: {
        type: String,
        required: true
    },


    authors: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    discipline: {
        type: String,
        required: true
    },
    sub_discipline: {
        type: String,
        required: true
    },


    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: false
    },
    edition: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },


    language: {
        type: String,   // spinner: romanian, english, french, german
        required: true
    },
    clasa: {
        type: String,   // spinner: [pre-school, 0-12], undergrad, grad, master, phd
        required: true
    },
    category: {
        type: String,   // spinner: book, article, lecture, manual, blog, workbook / exercise-book
        required: true
    },
    complexity: {   // spinner: simple, ..., hard
        type: String,
        required: true
    },


    keywords: {
        type: Array,
        required: true
    },


    publisher: {
        type: String,
        required: true
    },


    file_extension: {
        type: String,   // spinner: pdf, djvu
        required: true
    },
    file_size: {
        type: Number,   // in bytes
        required: true
    },
    uri_mirrors: {
        type: Array,    // <protocol>://<domains[]>/<path>
        required: true
    },


}, {
    id: true,
    timestamps: true,
});

const Reading = mongoose.model("reading", schema);
module.exports = {Reading};