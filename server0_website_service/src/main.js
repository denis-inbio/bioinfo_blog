// <TODO> <PARTIALLY DONE> next revision: Root -> [en] entry, [ro] intrare, [dk] indgang
// <TODO> <DONE PARTIALLY> <Need to check (req.protocol) for WebSocket> url traffic needs to include the protocol for the url [Http, Https, Websocket]
// <TODO> need to also add the domain name to .env, to avoid using "localhost" in the redirect (ProtocolRedirect)
// <TODO> need a page generator, from templates

// <TODO> decide on a default ownership credential
// <TODO> decide on a default exposable credential
// <TODO> using a password is the same as enabling 2FA (or multi-factor) authentication; the same goes for other private information or entropy

// <TODO> have a mechanism for exchanging entropy between client and server, at different moments of the communication (this can
    //  contribute to periodically changing some private-secure cookie)

// <TODO> need to talk to parabellum, maybe he has some ideas related to bioinformatic / molecular dynamics / chemistry

// ---- ---- ----

// ---- State is needed for the pipeline to work;
    // why ?
    // because all the functions in the pipeline take no parameters;
    // instead, they bind this $state object here to pass state

const state = {};

module.exports = { state };

// ---- APIs [HTTP, HTTPS, WebSocket]

const HttpApi = require("./js/http-api");
const HttpSslApi = require("./js/http-ssl-api");
const WebSocketApi = require("./js/websocket-api");

// ---- ---- ----

// ---- Utility (don't have repair functions)

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
        out_path = require("path").join(stems_array[0], stems_array[1]);
        // console.log("Before: ", out_path);
        for(let index = 2; index < stems_array.length; index++) {
            out_path = require("path").join(out_path, stems_array[index]);
            // console.log("During: ", out_path);
        }
        // console.log("After: ", out_path);
    }

    return out_path;
};

const UTILITY_ReadPEMs = () => {
    let key;
    let cert;

    try {
        key = require("fs").readFileSync("/home/nq/licenta/bioinfo_blog/server0_website_service/cert/key.pem");
        // state["READ_RSA_KEY_FILE"] = "succeeded";
        // console.log("RSA KEY: ", key);
    }
    catch (error) {
        console.log(error);
        // state["READ_RSA_KEY_FILE"] = "failed";
        UTILITY_RepairReadPEMs();   // <TODO> this needs to be a pipeline; if a repair is triggered, it restarts the whole pipeline; more advanced: the pipeline
                                    // repair mechanisms could jump to certain milestones in the pipeline, given that the effect of the repair does not propagate
                                    // "further back than the milestone"
    }

    try {
        cert = require("fs").readFileSync("/home/nq/licenta/bioinfo_blog/server0_website_service/cert/cert.pem");
        // state["READ_RSA_CERTIFICATE_FILE"] = "succeeded";
        // console.log("RSA CERTIFICATE: ", cert);
    }
    catch (error) {
        console.log(error);
        // state["READ_RSA_CERTIFICATE_FILE"] = "failed";
    }

    return [key, cert];
};

const UTILITY_RepairReadPEMs = () => {
    // execute:
    // openssl genrsa -out key.pem
    // openssl req -new -key key.pem -out csr.pem
    // openssl x509 -req -days 1 -in csr.pem -signkey key.pem -out cert.pem

    //
};

const UTILITY_HttpConfigureRoutes = (state) => {

    // import GET[], POST[], OPTIONS[], DELETE[], etc.
    for (let index = 0; index < HttpApi.GET.length; index++) {
        state.HttpApp.get(HttpApi.GET[index].route, HttpApi.GET[index].functions)
    }

    for (let index = 0; index < HttpApi.POST.length; index++) {
        state.HttpApp.post(HttpApi.POST[index].route, HttpApi.POST[index].functions)
    }

    for (let index = 0; index < HttpApi.PUT.length; index++) {
        state.HttpApp.put(HttpApi.PUT[index].route, HttpApi.PUT[index].functions)
    }

    for (let index = 0; index < HttpApi.DELETE.length; index++) {
        state.HttpApp.delete(HttpApi.DELETE[index].route, HttpApi.DELETE[index].functions)
    }

    for (let index = 0; index < HttpApi.OPTIONS.length; index++) {
        state.HttpApp.options(HttpApi.OPTIONS[index].route, HttpApi.OPTIONS[index].functions)
    }

};

const UTILITY_HttpSslConfigureRoutes = (state) => {

    // import GET[], POST[], OPTIONS[], DELETE[], etc.
    for (let index = 0; index < HttpSslApi.GET.length; index++) {
        state.HttpSslApp.get(HttpSslApi.GET[index].route, HttpSslApi.GET[index].functions)
    }

    for (let index = 0; index < HttpSslApi.POST.length; index++) {
        state.HttpSslApp.post(HttpSslApi.POST[index].route, HttpSslApi.POST[index].functions)
    }

    for (let index = 0; index < HttpSslApi.PUT.length; index++) {
        state.HttpSslApp.put(HttpSslApi.PUT[index].route, HttpSslApi.PUT[index].functions)
    }

    for (let index = 0; index < HttpSslApi.DELETE.length; index++) {
        state.HttpSslApp.delete(HttpSslApi.DELETE[index].route, HttpSslApi.DELETE[index].functions)
    }

    for (let index = 0; index < HttpSslApi.OPTIONS.length; index++) {
        state.HttpSslApp.options(HttpSslApi.OPTIONS[index].route, HttpSslApi.OPTIONS[index].functions)
    }

};

// ---- ---- ---- Pipeline

// ---- ENVIRONMENT phase
const ENVIRONMENT_DefineAllSymbols = (state) => {
    require("dotenv").config({
        path: ".env"
    });
    require("dotenv").config({
        path: "src/.env"
    });

    if(
        process.env["HTTP_SERVER_PORT"] &&
        process.env["HTTP_SSL_SERVER_PORT"] &&

        process.env["MONGODB_URI_PREFIX_MONGODB"] &&
        process.env["MONGODB_URI_SUFFIX_MONGODB"] &&

        process.env["ABSOLUTE_PATH__STEMS_ARRAY__PROJECT_DIRECTORY"] &&
        process.env["RELATIVE_PATH__FILES_DIRECTORY"] &&
        process.env["RELATIVE_PATH__SERVER_DIRECTORY"] &&
        process.env["RELATIVE_PATH__SSL_DIRECTORY"] &&
        process.env["RELATIVE_PATH__FAVICON_FILE"] &&

        process.env["RELATIVE_PATH__SERVER__NONSECUREHTML_DIRECTORY"] &&
        process.env["RELATIVE_PATH__SERVER__SECUREHTML_DIRECTORY"] &&

        process.env["RELATIVE_PATH__SSL__KEY_FILE"] &&
        process.env["RELATIVE_PATH__SSL__CERTIFICATE_FILE"]

) {
        // ---- ---- ---- Ports

        try {
            state["HttpPort"] = Number.parseInt(process.env["HTTP_SERVER_PORT"]);
            state["HttpSslPort"] = Number.parseInt(process.env["HTTP_SSL_SERVER_PORT"]);
        }
        catch (error) {
            console.log(error);

            state["HttpPort"] = 2120;   // <TODO> crash or use source hard-coded defaults ?
            state["HttpSslPort"] = 3440;
        }
        // ---- ---- ---- [MONGODB] URIs

        state["MongoDBUri"] = process.env["MONGODB_URI_PREFIX_MONGODB"] + "/" + process.env["MONGODB_URI_SUFFIX_MONGODB"];

        // ---- ---- ---- Directories

        state["AbsolutePath_ProjectDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["ABSOLUTE_PATH__STEMS_ARRAY__PROJECT_DIRECTORY"]));
        state["RelativePath_FilesDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__FILES_DIRECTORY"]));
        state["RelativePath_ServerDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__SERVER_DIRECTORY"]));
        state["RelativePath_SslDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__SSL_DIRECTORY"]));

        state["RelativePath_Server_NonSecureHtmlDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__SERVER__NONSECUREHTML_DIRECTORY"]));
        state["RelativePath_Server_SecureHtmlDirectory"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__SERVER__SECUREHTML_DIRECTORY"]));

        state["RelativePath_FaviconFile"] = UTILITY_StemsArrayToPath(UTILITY_StemsStringToStemsArray(process.env["RELATIVE_PATH__FAVICON_FILE"]));

        // ---- "derived absolute paths"
        state["AbsolutePath_NonSecureHtmlDirectory"] = require("path").join(
            state["AbsolutePath_ProjectDirectory"],
            state["RelativePath_ServerDirectory"],
            state["RelativePath_Server_NonSecureHtmlDirectory"]);

        state["AbsolutePath_SecureHtmlDirectory"] = require("path").join(
            state["AbsolutePath_ProjectDirectory"],
            state["RelativePath_ServerDirectory"],
            state["RelativePath_Server_SecureHtmlDirectory"]);

        state["AbsolutePath_FaviconFile"] = require("path").join(
            state["AbsolutePath_ProjectDirectory"],
            state["RelativePath_FaviconFile"]);

        // ----

        state["ENVIRONMENT_DefineAllSymbols"] = "succeeded";
    }
    else {
        state["ENVIRONMENT_DefineAllSymbols"] = "failed";
    }
};

const ENVIRONMENT_RepairDefineAllSymbols = (state) => {
    require("dotenv").config({
        path: ".env"
    });
    require("dotenv").config({
        path: "src/.env"
    });

    state["ENVIRONMENT_DefineAllSymbols"] = "repaired";    // <TODO> actual repair; maybe use source-coded defaults

    state["ENVIRONMENT_DefineAllSymbols"] = "irreparable";
};

// ---- CONFIGURE phase

const CONFIGURE_HttpApp = (state) => { // <TODO> configure an actual Http server, and the Express app (as just a handler)

    if ( require("http") && require("express") && require("body-parser") && require("body-parser").raw() && require("body-parser").json() && require("body-parser").urlencoded({extended: true}) ) {

        state.HttpApp = require("express")();

        // <TODO> .use()
        // <TODO> .routes: for loops
        // <TODO> bind the server with the Express app

        state.HttpApp.disable('x-powered-by');
        state.HttpApp.use(require("body-parser").raw());
        state.HttpApp.use(require("body-parser").json());
        state.HttpApp.use(require("body-parser").urlencoded({extended: true}));
        state.HttpApp.use(require("cookie-parser")());

        UTILITY_HttpConfigureRoutes(state);

        state["CONFIGURE_HttpApp"] = "succeeded";
    }
    else {
        state["CONFIGURE_HttpApp"] = "failed";
    }

};

const CONFIGURE_RepairHttpApp = (state) => {

    if ( require("http") && require("express") && require("body-parser") && require("body-parser").raw() && require("body-parser").json() && require("body-parser").urlencoded({extended: true}) ) {
        state.HttpSslPort = 3440;   // <TODO> source hard-coded repair ? by doing what ? installing the npm packages ?

        state["CONFIGURE_HttpApp"] = "repaired";
    }
    else {
        state["CONFIGURE_HttpApp"] = "irreparable";
    }
};

const CONFIGURE_HttpSslApp = (state) => {

    if ( require("https") && require("express") && require("body-parser") && require("body-parser").raw() && require("body-parser").json() && require("body-parser").urlencoded({extended: true}) ) {

        state.HttpSslApp = require("express")();

        // <TODO> .use()
        // <TODO> .routes: for loops
        // <TODO> bind the server with the Express app

        state.HttpSslApp.disable('x-powered-by');
        state.HttpSslApp.use(require("body-parser").raw());
        state.HttpSslApp.use(require("body-parser").json());
        state.HttpSslApp.use(require("body-parser").urlencoded({extended: true}));
        state.HttpSslApp.use(require("cookie-parser")());

        UTILITY_HttpSslConfigureRoutes(state);

        state["CONFIGURE_HttpSslApp"] = "succeeded";
    }
    else {
        state["CONFIGURE_HttpSslApp"] = "repaired";
    }

};

const CONFIGURE_RepairHttpSslApp = (state) => {

    if ( require("https") && require("express") && require("body-parser") && require("body-parser").raw() && require("body-parser").json() && require("body-parser").urlencoded({extended: true}) ) {
        state.HttpSslPort = 3440;   // <TODO> source hard-coded repair ? by doing what ? installing the npm packages ?

        state["CONFIGURE_HttpSslApp"] = "repaired";
    }
    else {
        state["CONFIGURE_HttpSslApp"] = "irreparable";
    }

};

// ---- DATABASE phase

const DATABASE_ConnectMongoDB = async (state) => {

    try {
        const mongoose_connection = await require("mongoose").connect(state["MongoDBUri"]);

        state["DATABASE_ConnectMongoDB"] = "succeeded";
    }
    catch (error) {
        console.log(error);
        state["DATABASE_ConnectMongoDB"] = "failed";
    }

};

const DATABASE_RepairConnectMongoDB = (state) => {

    state["DATABASE_ConnectMongoDB"] = "repaired";

    state["DATABASE_ConnectMongoDB"] = "irreparable";
};

// ---- SERVER phase

const SERVER_HttpServer = (state) => {

    state.HttpServer = require("http").createServer(state.HttpApp);
    state.HttpServer.listen(state.HttpPort, () => { console.log(`Listening http:// on port ${state.HttpPort}`); });

    state["SERVER_HttpServer"] = "succeeded";

};

const SERVER_RepairHttpServer = (state) => {

    state["SERVER_HttpServer"] = "repaired";

    state["SERVER_HttpServer"] = "irreparable";
};

const SERVER_HttpSslServer = (state) => {

    const [key, certificate] = UTILITY_ReadPEMs();

    state.HttpSslServer = require("https").createServer({
        key: key,
        cert: certificate
    }, state.HttpSslApp);

    state.HttpSslServer.listen(state.HttpSslPort, () => { console.log(`Listening https:// on port ${state.HttpSslPort}`); });


    state["SERVER_HttpSslServer"] = "failed";
    state["SERVER_HttpSslServer"] = "succeeded";

};

const SERVER_RepairHttpSslServer = (state) => {

    state["SERVER_HttpSslServer"] = "repaired";

    state["SERVER_HttpSslServer"] = "irreparable";
};

// ---- ---- ---- Pipeline definition

const initialization_pipeline = [
    {
        name: "ENVIRONMENT_DefineAllSymbols",
        do: ENVIRONMENT_DefineAllSymbols,
        repair: ENVIRONMENT_RepairDefineAllSymbols,
    },
    {
        name: "CONFIGURE_HttpApp",
        do: CONFIGURE_HttpApp,
        repair: CONFIGURE_RepairHttpApp,
    },
    {
        name: "CONFIGURE_HttpSslApp",
        do: CONFIGURE_HttpSslApp,
        repair: CONFIGURE_RepairHttpSslApp,
    },

    {
        name: "DATABASE_ConnectMongoDB",
        do: DATABASE_ConnectMongoDB,
        repair: DATABASE_RepairConnectMongoDB,
    },
    {
        name: "SERVER_HttpServer",
        do: SERVER_HttpServer,
        repair: SERVER_RepairHttpServer,
    },
    {
        name: "SERVER_HttpSslServer",
        do: SERVER_HttpSslServer,
        repair: SERVER_RepairHttpSslServer,
    },




];

// ---- ---- ----

const ExecutePipeline = async (state) => {

    for (let index = 0; index < initialization_pipeline.length; index++) {
        state[initialization_pipeline[index].name] = "pending";    // ->(repair -> (irreparable, repaired), succeeded -> ...next...)
        // console.log(`index ${index} is 'pending'`);

        // console.log(initialization_pipeline[index].do, typeof initialization_pipeline[index].do);
        if (initialization_pipeline[index].do.constructor.name === "AsyncFunction") {
            await initialization_pipeline[index].do(state);
        }
        else {
            initialization_pipeline[index].do(state);
        }
// ----

        // console.log("Checking for succeeded: ", state[initialization_pipeline[index].name] === "succeeded");
        // console.log("Checking for repair: ", state[initialization_pipeline[index].name] === "repaired");

        if(state[initialization_pipeline[index].name] === "succeeded") {
            // console.log(`index ${index} is 'succeeded'`);
            ;
        }
        else if (state[initialization_pipeline[index].name] === "failed") {
            // console.log(`index ${index} is 'repair'`);
            initialization_pipeline[index].repair(state);

            if (state[initialization_pipeline[index].name] === "irreparable") {
                console.log(`The pipeline encountered an irreparable error in function ${initialization_pipeline[index].name}`);
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
            console.log("Undefined state");
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
