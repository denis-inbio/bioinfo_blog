// ----

const pipelineFunctions = require("./pipeline_function");
const {GET_Homepage} = require("./pipeline_function");

// ----

const ConfigureExpress_REST_API = (app) => {
    app.get("/", pipelineFunctions.OPTIONS_CORS_AllowAll_OnlyGET, GET_Homepage);
    app.get("/favicon.ico", pipelineFunctions.OPTIONS_CORS_AllowAll_OnlyGET, pipelineFunctions.GET_Favicon);
    app.get("/files", pipelineFunctions.OPTIONS_CORS_AllowAll_OnlyGET, pipelineFunctions.GET_Files);
    app.get("/json/diploma", pipelineFunctions.OPTIONS_CORS_AllowAll_OnlyGET, pipelineFunctions.GET_Diploma_JSON);

};

// ----
// ----

module.exports = {ConfigureExpress_REST_API};