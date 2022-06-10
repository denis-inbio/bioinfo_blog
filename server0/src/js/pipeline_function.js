// ----

const fs = require("fs");
const mongoose = require("mongoose");

// ---- INTERMEDIARY FUNCTIONS ("Middleware")

const OPTIONS_CORS_AllowAll_OnlyGET = (req, res, next) => {
    console.log("OPTIONS_CORS_AllowAll_OnlyGET");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");

    next();
};

const OPTIONS_CORS_AllowAll = (req, res, next) => {
    console.log("OPTIONS_CORS_AllowAll");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,HEAD,PATCH");

    next();
};

// ---- TERMINAL FUNCTIONS [GET]

const GET_Homepage = (req, res, next) => {
    console.log("GET_Homepage");

    res.responseType = "application/html";
    res.send("<p>This is the homepage</p>");

};

const GET_Favicon = (req, res, next) => {
    console.log("GET_Favicon");

    res.sendFile(process.env["FAVICON_PATH"]);

    // https://stackoverflow.com/questions/37298608/content-security-policy-the-pages-settings-blocked-the-loading-of-a-resource
    // when does a website try to get a favicon.ico ?
    // Content Security Policy: The page’s settings blocked the loading of a resource at http://localhost:2121/favicon.ico (“default-src”).
};

const GET_Files = (req, res, next) => {
    console.log("GET_Files");

    fs.readdir(process.env["FILES_DIRECTORY_PATH"], (error, files) => {
        if (error) {
            console.log(error);

            res.end();
        } else {
            console.log(files);

            res.send(files);
        }
    });

};

// ---- TERMINAL FUNCTIONS [GET JSON FORMS]

const GET_Diploma_JSON = (req, res, next) => {
    res.send({
        file: "File",
        organizer: "Organizer?",
        concurs: "String",
        concurs_classification: "String?",
        etapa: "String?",
        premiu: "String",
        student: "String",
        score: "String?",
        school: "ObjectId",
        classroom: "ObjectId",
        teacher: "Teacher?",
        coordinator: "String?",
        normativ: "ObjectId?",
        parteners: "Array?",
        signatures: "Array?",
        registration_date: "Date?",
        proof: "ObjectId?",

        createdAt: "Date",
        updatedAt: "Date",
        _id: "ObjectId"
    });

}

// ---- TERMINAL FUNCTIONS [POST]

const POST_Diploma = (req, res, next) => {
    console.log("POST_File");

    if (req.contentType === "application/json") {
        console.log("Received body [JSON]: ", req.body);

        res.end();
    } else if (req.contentType === "octet-stream") {
        console.log("Received body [octet-stream]: ", req.body);

        res.end();
    } else {
        console.log("Unrecognized body encoding", req.body);

        res.end();
    }
};

// ----

// ----

// note: every POST and PUT / non-simple might need the     res.set("Access-Control-Allow-Origin", "*");
// ----

module.exports = {OPTIONS_CORS_AllowAll_OnlyGET, OPTIONS_CORS_AllowAll, GET_Homepage, GET_Favicon, GET_Files, GET_Diploma_JSON, POST_Diploma};