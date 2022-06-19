/// ---- ---- ----

const mongoose = require("mongoose");

const express = require("express");
const app = express();

/// ---- ---- ----

const config = require("./../../config");

/// ---- ---- ---- GET REQUESTS

app.get("/", (req, res, next) => {

    next();
});


app.get("/reading/complexity/spinner", (req, res, next) => {

    res.send({
        authors: "Array",
        title: "String",
        discipline: "String",
        sub_discipline: "String",
        year: "Number",
        month: "Number",
        edition: "Number",
        volume: "Number",
        pages: "Number",
        language: "String",
        clasa: "String",
        category: "String",
        complexity: "String",
        keywords: "Array",
        publisher: "String",
        file_extensions: "String",
        file_size: "Number",
        uri_mirrors: "Array"
    });

    next();
});

/// ---- ---- ---- ? REQUESTS

/// ---- ---- ---- ? REQUESTS

app.listen(config.port, () => { console.log(`Listening on port ${config.port}`); });