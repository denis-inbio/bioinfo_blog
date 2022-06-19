// ----

const pipeline = require("./pipeline-function");

// ----



// ----

const GET = [
    { route: "/app", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_App ]},

    { route: "/", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_Root ]},
    { route: "/mobile", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRoot ]},

        { route: "/en", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
        { route: "/en/register", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN_Register ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
        { route: "/en/authenticate", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN_Authenticate ]}, //
        { route: "/en/exposable-credential", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN_ExposableCredential ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
        { route: "/en/session", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN_Session ]},  // choose the details for the session to-be
        { route: "/en/private-space", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN_PrivateSpace ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

        { route: "/mobile/en", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRootEN ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
        { route: "/mobile/en/register", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRootEN_Register ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
        { route: "/mobile/en/authenticate", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRootEN_Authenticate ]}, //
        { route: "/mobile/en/exposable-credential", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRootEN_ExposableCredential ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
        { route: "/mobile/en/session", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRootEN_Session ]},  // choose the details for the session to-be
        { route: "/mobile/en/private-space", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRootEN_PrivateSpace ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

        { route: "/dk", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
        { route: "/dk/registrere", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
        { route: "/dk/autentificere", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, //
        { route: "/dk/eksponerbar-legitimation", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
        { route: "/dk/session", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // choose the details for the session to-be
        { route: "/dk/privat-rum", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

        { route: "/mobile/dk", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
        { route: "/mobile/dk/registrere", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
        { route: "/mobile/dk/autentificere", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, //
        { route: "/mobile/dk/eksponerbar-legitimation", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
        { route: "/mobile/dk/session", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // choose the details for the session to-be
        { route: "/mobile/dk/privat-rum", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

        { route: "/ro", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootRO ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
        { route: "/ro/înregistrare", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
        { route: "/ro/autentificare", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, //
        { route: "/ro/credențial-expusabil", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
        { route: "/ro/sesiune", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // choose the details for the session to-be
        { route: "/ro/spațiu-privat", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

        { route: "/mobile/ro", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
        { route: "/mobile/ro/înregistrare", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
        { route: "/mobile/ro/autentificare", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]}, //
        { route: "/mobile/ro/credențial-expusabil", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
        { route: "/mobile/ro/sesiune", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // choose the details for the session to-be
        { route: "/mobile/ro/spațiu-privat", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

    { route: "/api/exposable-credential", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_Root_API_ExposableCredential ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

];

const POST = [
//    { route: "/app", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_App ]}, // <TODO> WebSocket communication will be done on this route as well ? actually, that is a different protocol, and doesn't make use of GET-POST-etc., but uses its own triggers / callbacks architecture (since it's a "duplex triggerable/interruptable" protocol)

//    { route: "/", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_Root ]},
//    { route: "/mobile", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRoot ]},

    // { route: "/en", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootEN ?? ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    { route: "/en/register", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootEN_Register ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    { route: "/en/authenticate", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootEN_Authenticate ]}, //
    { route: "/en/exposable-credential", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_Root_API_ExposableCredential ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    { route: "/en/session", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootEN_Session ]},  // choose the details for the session to-be
    // { route: "/en/private-space", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootEN_PrivateSpace ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

    // { route: "/mobile/ro", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootRO ?? ]},  // the navigation hub for English { route: actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    { route: "/mobile/ro/înregistrare", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootRO_Înregistrare ]}, // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    { route: "/mobile/ro/autentificare", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootRO_Authenticare ]}, //
    { route: "/mobile/ro/credențial-expusabil", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootRO_CredențialExpusabil ]},    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    { route: "/mobile/ro/sesiune", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootRO_Sesiune ]},  // choose the details for the session to-be
    // { route: "/mobile/ro/spațiu-privat", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_RootRO_SpațiuPrivat ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

    { route: "/api/authenticate", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_Root_API_Authenticate ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...
    { route: "/api/register", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_Root_API_Register ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...
    { route: "/api/register-confirm", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.POST_Root_API_RegisterConfirm ]},  // see: expirables, current session(s) { route: if multiple devices ]}, traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", functions: [ CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

];

const PUT = [
];

const DELETE = [
    { route: "/api/register", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.DELETE_Root_API_Register ]},
    { route: "/api/exposable-credential", functions: [ pipeline.SERVERSIDE_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.DELETE_Root_API_ExposableCredential ]},
];

const OPTIONS = [
];

// ----

module.exports = {GET, POST, PUT, DELETE, OPTIONS};