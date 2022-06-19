// .env [get symbols for Mongoose]
//     -> 0: search for an .env file amidst the project directory, which has the symbols; might halt
//     -> 1: database [connect]
//         -> 0: search for db server; might have to boot the server on its own; might have to decide on the port dynamically; might halt {warning: identical but unequivalent symbols might be found}
//         -> 1: .env [get symbols for HttpServer]
//             -> 0: search for an .env file amidst the project directory, which has the symbols; might halt {warning: identical but unequivalent symbols might be found}
//             -> 1: HttpServer [configure / load the REST API]
//                 -> 0: ? formally unreachable ?
//                 -> 1: HttpServer [listen on port]
//                     -> 0: ...
//                     -> 1: ...

// ---- ---- ----

const mongoose = require("mongoose");
const express = require("express");

const callback = require("./js/callback");
const config = require("./config");
const REST_API = require("./js/rest_api");
// ---- ---- ----

const ENVIRONMENT_Mongoose = (state) => {
    require("dotenv").config({
        path: "src/.env"
    });

    if (process.env["MONGODB_URI_PREFIX_MONGODB"] && process.env["MONGODB_DATABASES"] && process.env["MONGODB_URI_SUFFIX_MONGODB"]) {
        state["MONGODB_URI"] = process.env["MONGODB_URI_PREFIX_MONGODB"] + "/" + process.env["MONGODB_URI_SUFFIX_MONGODB"];
        state["ENVIRONMENT_Mongoose"] = "success";
    }
    else {
        state["ENVIRONMENT_Mongoose"] = "repair";
    }

    // console.log("State ENVIRONMENT_Mongoose: ", state);
};

const ENVIRONMENT_RepairMongoose = (state) => {
    require("dotenv").config({
        path: ".env"
    });

    if (process.env["MONGODB_URI_PREFIX_MONGODB"] && process.env["MONGODB_DATABASES"] && process.env["MONGODB_URI_SUFFIX_MONGODB"]) {
        state["MONGODB_URI"] = process.env["MONGODB_URI_PREFIX_MONGODB"] + "/" + process.env["MONGODB_URI_SUFFIX_MONGODB"];
        state["ENVIRONMENT_Mongoose"] = "repaired";
    }
    else {
        state["ENVIRONMENT_Mongoose"] = "irreparable";
    }
    // console.log("State ENVIRONMENT_RepairMongoose: ", state);
};

const DATABASE_Connect = async (state) => {

    try {
        const mongoose_connect = await mongoose.connect(state["MONGODB_URI"]);
        state["DATABASE_Connect"] = "success";
    }
    catch (error) {
        console.log(error);
        state["DATABASE_Connect"] = "repair";
    };

    // console.log("State DATABASE_Connect: ", state);
};

const DATABASE_RepairConnect = (state) => {

    state["DATABASE_Connect"] = "irreparable";
    state["DATABASE_Connect"] = "repaired";

    // console.log("State DATABASE_RepairConnect: ", state);
};

// ----

const ENVIRONMENT_HttpServer = (state) => {

    if (config.port && require("express") && require("body-parser") && require("body-parser").json()) {
        state.HttpPort = config.port;
        state.app = express();
        state["ENVIRONMENT_HttpServer"] = "success";
    }
    else {
        state["ENVIRONMENT_HttpServer"] = "repair";
    }

    // console.log("State ENVIRONMENT_HttpServer: ", state);
};

const ENVIRONMENT_RepairHttpServer = (state) => {
    require("dotenv").config({
        path: ".env"
    });
    require("dotenv").config({
        path: "src/.env"
    });

    state["ENVIRONMENT_HttpServer"] = "repaired";
    // console.log("State ENVIRONMENT_RepairHttpServer: ", state);
};

const HTTPSERVER_ExpressConfiguration = (state) => {

    state.app.disable('x-powered-by');
    state.app.use(require("cookie-parser")());
    state.app.use(require("body-parser").json());
    state.app.use(express.urlencoded({extended: true}));
    state.app.use(express.static("public"));

    state["HTTPSERVER_ExpressConfiguration"] = "success";
    // console.log("State HTTPSERVER_ExpressConfiguration: ", state);
};

const HTTPSERVER_RepairExpressConfiguration = (state) => {
    state["HTTPSERVER_ExpressConfiguration"] = "repaired";

    // console.log("State HTTPSERVER_RepairExpressConfiguration: ", state);
};

const HTTPSERVER_ConfigureRoutes = (state) => {
    REST_API.ConfigureExpress_REST_API(state.app);

    state["HTTPSERVER_ConfigureRoutes"] = "success";

    // console.log("State HTTPSERVER_ConfigureRoutes: ", state);

};

const HTTPSERVER_RepairConfigureRoutes = (state) => {

    state["HTTPSERVER_ConfigureRoutes"] = "repaired";

    // console.log("State HTTPSERVER_RepairConfigureRoutes: ", state);
};

const HTTPSERVER_Listen = (state) => {

    state.app.listen(state.HttpPort);

    state["HTTPSERVER_Listen"] = "success";

    // console.log("State HTTPSERVER_Listen: ", state);
    console.log(`Listening on port ${state.HttpPort}`);
};

const HTTPSERVER_RepairListen = (state) => {

    state["HTTPSERVER_Listen"] = "repaired";

    // console.log("State HTTPSERVER_RepairListen: ", state);
};

// ----

const initialization_pipeline = [
    {
        name: "ENVIRONMENT_Mongoose",
        do: ENVIRONMENT_Mongoose,
        repair: ENVIRONMENT_RepairMongoose,
    },
    {
        name: "DATABASE_Connect",
        do: DATABASE_Connect,
        repair: DATABASE_RepairConnect
    },
    {
        name: "ENVIRONMENT_HttpServer",
        do: ENVIRONMENT_HttpServer,
        repair: ENVIRONMENT_RepairHttpServer
    },
    {
        name: "HTTPSERVER_ExpressConfiguration",
        do: HTTPSERVER_ExpressConfiguration,
        repair: HTTPSERVER_RepairExpressConfiguration
    },
    {
        name: "HTTPSERVER_ConfigureRoutes",
        do: HTTPSERVER_ConfigureRoutes,
        repair: HTTPSERVER_RepairConfigureRoutes
    },
    {
        name: "HTTPSERVER_Listen",
        do: HTTPSERVER_Listen,
        repair: HTTPSERVER_RepairListen
    },

];

// ---- ---- ----

const ExecutePipeline = async () => {
    const state = {};

    for (let index = 0; index < initialization_pipeline.length; index++) {
        state[initialization_pipeline[index].name] = "pending";    // ->(repair -> (irreparable, repaired), success -> ...next...)
        // console.log(`index ${index} is 'pending'`);

        // console.log(initialization_pipeline[index].do, typeof initialization_pipeline[index].do);
        if (initialization_pipeline[index].do.constructor.name === "AsyncFunction") {
            await initialization_pipeline[index].do(state);
        }
        else {
            initialization_pipeline[index].do(state);
        }
// ----

        // console.log("Checking for success: ", state[initialization_pipeline[index].name] === "success");
        // console.log("Checking for repair: ", state[initialization_pipeline[index].name] === "repair");

        if(state[initialization_pipeline[index].name] === "success") {
            // console.log(`index ${index} is 'success'`);
            ;
        }
        else if (state[initialization_pipeline[index].name] === "repair") {
            // console.log(`index ${index} is 'repair'`);
            initialization_pipeline[index].repair(state);

            if (state[initialization_pipeline[index].name] === "irreparable") {
                // console.log(`index ${index} is 'irreparable'`);
                break;
            }
            else if (state[initialization_pipeline[index].name] === "repaired") {
                // console.log(`index ${index} is 'repaired'`);
                initialization_pipeline[index].do(state);
            }
            else {
                break;
            }
        }
        else {
            // console.log("Undefined state");
            break;
        }
    }
};

ExecutePipeline();

// const pipeline = require("./js/pipeline_function");
// const app = express();
// app.get("/", pipeline.GET__);
// app.listen(2120);