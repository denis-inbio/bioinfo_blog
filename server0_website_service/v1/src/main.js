// ---- ---- ----

const state = {};

module.exports = { state };

// ---- ---- ----

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const reqQueue = require("express-queue");

// ----

const config = require("./js/config");
const REST_API = require("./js/rest-api");

// ----

const { BlogPost } = require("./model/blog-post");
const { ExposableCredential } = require("./model/exposable-credential");
const { IPTraffic } = require("./model/ip-traffic");
const { Session } = require("./model/session");
const { UrlTraffic, VALIDATE_REPAIR_UrlTraffic } = require("./model/url-traffic");
const { User } = require("./model/user");

const pipeline = require("./js/pipeline-function");

// ---- ---- ----

const UTILITY_StemsStringToStemsArray = (stems_string) => {
    let array = [];
    let current = "";

    for (let index = 0; index < stems_string.length; index++) {
        // console.log("Before: ", current, array);

        if(stems_string[index] === ',') {
            array.push(current);
            current = "";
        }
        else if (index === stems_string.length - 1) {
            current += stems_string[index];
            array.push(current);
        }
        else {
            current += stems_string[index];
        }

        // console.log("After: ", current, array);
    }

    return array;
};

const UTILITY_StemsArrayToPath = (stems_array) => {
    let out_path;

    if (stems_array.length === 0) {
        out_path = "";
    }
    else if (stems_array.length === 1) {
        out_path = stems_array[0];
    }
    else if(stems_array.length >= 2) {
        out_path = path.join(stems_array[0], stems_array[1]);
        // console.log("Before: ", out_path);
        for(let index = 2; index < stems_array.length; index++) {
            out_path = path.join(out_path, stems_array[index]);
            // console.log("During: ", out_path);
        }
        // console.log("After: ", out_path);
    }

    return out_path;
};

const ROUTES_UnionOfAllRoutes = () => {
    const routes = [];

    for (let index = 0; index < REST_API.GET.length; index++) {
        routes.push(REST_API.GET[index].route);
    }

    return routes;
};

const DATABASE_InitializeCollections = () => {
    DATABASE_InitializeURLTrafficCollection();

    state["DATABASE_InitializeCollections"] = "failure";
    state["DATABASE_InitializeCollections"] = "success";
};

const DATABASE_RepairInitializeCollections = () => {

    state["DATABASE_InitializeCollections"] = "irreparable";
    state["DATABASE_InitializeCollections"] = "repaired";
};

const DATABASE_InitializeURLTrafficCollection = async () => {   // <TODO> only the GET routes ? there can be routes without GET, but with POST, so I actually need a union of all of the routes
    const routes = ROUTES_UnionOfAllRoutes();
    console.log("Routes: ", routes);

    for (let index = 0; index < routes.length; index++) {
        const result = await UrlTraffic.find({
            url: routes[index]
        });

        if (result.length === 0) {
            const urlTraffic = new UrlTraffic({
                url: routes[index],
                GET: 0,
                POST: 0,
                PUT: 0,
                DELETE: 0,
                OPTIONS: 0
            });

            urlTraffic.save()
                .then(
                    (fulfilled) => {
                        // console.log(fulfilled);
                    },
                    (rejected) => {
                        // console.log(rejected);
                    }
                )
                .catch( (error) => {
                    console.log(error);
                });
        }
        else if (result.length === 0) {
            await VALIDATE_REPAIR_UrlTraffic(result[0]).save();
        }
        else {

        }
    }
};

// ---- ---- ----

const ENVIRONMENT_Directories = (state) => {
    require("dotenv").config({
        path: ".env"
    });
    require("dotenv").config({
        path: "src/.env"
    });

    if( process.env["ABSOLUTE_PATH__STEMS_ARRAY__PROJECT_DIRECTORY"] &&
        process.env["RELATIVE_PATH__SERVER_DIRECTORY"] &&
        process.env["RELATIVE_PATH__FILES_DIRECTORY"] &&
        process.env["RELATIVE_PATH__FAVICON_FILE"]
    ) {
        state["absolutePath_projectDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["ABSOLUTE_PATH__STEMS_ARRAY__PROJECT_DIRECTORY"]));
        state["relativePath_filesDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__FILES_DIRECTORY"]));
        state["relativePath_faviconFile"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__FAVICON_FILE"]));
        state["relativePath_serverDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__SERVER_DIRECTORY"]));
        state["relativePath_server_HTMLDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__SERVER__HTML_DIRECTORY"]));

        state["absolutePath_HTMLDirectory"] = path.join(
            state["absolutePath_projectDirectory"],
            state["relativePath_serverDirectory"],
            state["relativePath_server_HTMLDirectory"]);

        state["ENVIRONMENT_Directories"] = "success";
    }
    else {
        state["ENVIRONMENT_Directories"] = "failure";
    }

    // console.log("State ENVIRONMENT_ProjectDirectory: ", state);
};

const ENVIRONMENT_RepairDirectories = (state) => {
    require("dotenv").config({
        path: ".env"
    });
    require("dotenv").config({
        path: "src/.env"
    });

    if (true) {

        state["ENVIRONMENT_Directories"] = "repaired";
    }
    else {
        state["ENVIRONMENT_Directories"] = "irreparable";
    }
    // console.log("State ENVIRONMENT_RepairDirectories: ", state);
};
// ---- ---- ----

const ENVIRONMENT_Mongoose = (state) => {
    require("dotenv").config({
        path: "src/.env"
    });

    if (process.env["MONGODB_URI_PREFIX_MONGODB"] && process.env["MONGODB_URI_SUFFIX_MONGODB"]) {
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

    if (process.env["MONGODB_URI_PREFIX_MONGODB"] && process.env["MONGODB_URI_SUFFIX_MONGODB"]) {
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

    // const requestsQueueManager = reqQueue({activeLimit: 4, queuedLimit: 10});
    // requestsQueueManager.rejectHandler = (req, res) => {
    //         console.log(`Rejecting request, limit reached ${requestsQueueManager.queue.length}`);
    //         res.status(500);
    //         res.send();
    // };

    state.app.disable('x-powered-by');
    // state.app.use(requestsQueueManager); // <TODO> doesn't really solve any problem
    state.app.use(require("body-parser").raw());
    state.app.use(require("body-parser").json());
//    state.app.use(express.urlencoded({extended: true}));  // when do you use this ? for query parameters ?
    state.app.use(require("cookie-parser")());  // this I might do myself though ? it's just a string -> array (I won't use punctuation for values, to keep it simple)
    state.app.use(express.static("public"));

    state["HTTPSERVER_ExpressConfiguration"] = "success";
    // console.log("State HTTPSERVER_ExpressConfiguration: ", state);
};

const HTTPSERVER_RepairExpressConfiguration = (state) => {
    state["HTTPSERVER_ExpressConfiguration"] = "repaired";

    // console.log("State HTTPSERVER_RepairExpressConfiguration: ", state);
};

const HTTPSERVER_ConfigureRoutes = (state) => {

    // import GET[], POST[], OPTIONS[], DELETE[], etc.
    for (let index = 0; index < REST_API.GET.length; index++) {
        state.app.get(REST_API.GET[index].route, REST_API.GET[index].functions)
    }

    for (let index = 0; index < REST_API.POST.length; index++) {
        state.app.post(REST_API.POST[index].route, REST_API.POST[index].functions)
    }

    for (let index = 0; index < REST_API.PUT.length; index++) {
        state.app.put(REST_API.PUT[index].route, REST_API.PUT[index].functions)
    }

    for (let index = 0; index < REST_API.DELETE.length; index++) {
        state.app.delete(REST_API.DELETE[index].route, REST_API.DELETE[index].functions)
    }

    for (let index = 0; index < REST_API.OPTIONS.length; index++) {
        state.app.options(REST_API.OPTIONS[index].route, REST_API.OPTIONS[index].functions)
    }

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
        name: "ENVIRONMENT_Directories",
        do: ENVIRONMENT_Directories,
        repair: ENVIRONMENT_RepairDirectories,
    },
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
        name: "DATABASE_InitializeCollections",
        do: DATABASE_InitializeCollections,
        repair: DATABASE_RepairInitializeCollections
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

const ExecutePipeline = async (state) => {

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

ExecutePipeline(state);

// console.log(mongoose.modelNames());

// BlogPost.collection.drop()
//     .catch( (error) => {
//         console.log(error);
//     });
//
// ExposableCredential.collection.drop()
//     .catch( (error) => {
//         console.log(error);
//     });
// IPTraffic.collection.drop()
//     .catch( (error) => {
//         console.log(error);
//     });

// Session.collection.drop()
//     .catch( (error) => {
//         console.log(error);
//     });
//
//
// UrlTraffic.collection.drop()
//     .catch( (error) => {
//         console.log(error);
//     });
//
// User.collection.drop()
//     .catch( (error) => {
//         console.log(error);
//     });

// ---- ---- ----
