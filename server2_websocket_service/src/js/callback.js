// ----

const config = require("../../config");
const express = require("express");

// ----

const bodyparser = require("body-parser");

const api = require("./rest_api");

// ----

const HttpServerStartup = () => {
    console.log(`Http server is listening on port ${config.port}`);
}

const ExpressConfig = (app) => {
    app.disable('x-powered-by');

    app.use(express.static("public"));
    app.use(express.urlencoded({extended: true}));
    app.use(bodyparser.json());

    api.ConfigureExpress_REST_API(app);

    app.listen(config.port, HttpServerStartup);
};

const MongooseSuccessfulServerConnect = (app) => {
    console.log(`Connected to ${process.env["URI_PREFIX_MONGODB"]}/${process.env["URI_SUFFIX_MONGODB"]}`);

    ExpressConfig(app);
};

const MongooseFailedServerConnect = () => {
    console.log(`Failed to connect to ${process.env["URI_PREFIX_MONGODB"]}/${process.env["URI_SUFFIX_MONGODB"]}`);
};

const FailedToFindMongooseEnvironmentParameters = () => {
    console.log("'dotenv' failed to find URI_PREFIX_MONGODB, DATABASES or URI_SUFFIX_MONGODB");
};

// ----

module.exports = {HttpServerStartup, MongooseSuccessfulServerConnect, MongooseFailedServerConnect, FailedToFindMongooseEnvironmentParameters};