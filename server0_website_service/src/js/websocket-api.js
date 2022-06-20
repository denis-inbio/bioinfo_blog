// ----

const pipeline = require("./websocket-pipeline");

// ----

const GET = [

    { route: "/app", functions: [ pipeline.SERVERSIDE_MonitorClientIPTraffic, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_App ]},

];

const POST = [

    { route: "/app", functions: [ pipeline.SERVERSIDE_MonitorClientIPTraffic, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_App ]},

];

const PUT = [

    { route: "/app", functions: [ pipeline.SERVERSIDE_MonitorClientIPTraffic, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_App ]},

];

const DELETE = [

    { route: "/app", functions: [ pipeline.SERVERSIDE_MonitorClientIPTraffic, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_App ]},

];

const OPTIONS = [

    { route: "/app", functions: [ pipeline.SERVERSIDE_MonitorClientIPTraffic, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_App ]},

];

// ----

module.exports = {GET, POST, PUT, DELETE, OPTIONS};