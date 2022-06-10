// ----

require("dotenv").config();

const config = require("../config");
const callback = require("./js/callback");

const mongoose = require("mongoose");
const express = require("express");
const app = express();

// ----

if (process.env["URI_PREFIX_MONGODB"] && process.env["DATABASES"] && process.env["URI_SUFFIX_MONGODB"]) {
    mongoose.connect(process.env["URI_PREFIX_MONGODB"] + "/" + process.env["URI_SUFFIX_MONGODB"])
        .then((success) => {
            callback.MongooseSuccessfulServerConnect(app)
        }, (failure) => {
            callback.MongooseFailedServerConnect();
        })
} else {
    callback.FailedToFindMongooseEnvironmentParameters();
}
