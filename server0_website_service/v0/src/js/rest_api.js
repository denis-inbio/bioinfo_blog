// ----

const pipeline = require("./pipeline_function");
const ConfigureExpress_REST_API = (app) => {
    // app.get("/", pipeline.OPTIONS_CORS_AllowAll_OnlyGET, pipeline.GET_Homepage);
    // app.get("/favicon.ico", pipeline.OPTIONS_CORS_AllowAll_OnlyGET, pipeline.GET_Favicon);
    // app.get("/files", pipeline.OPTIONS_CORS_AllowAll_OnlyGET, pipeline.GET_Files);
    // app.get("/json/diploma", pipeline.OPTIONS_CORS_AllowAll_OnlyGET, pipeline.GET_Diploma_JSON);

    // <TODO> when deploying, how does "www." or "no www." get handled/routed ?

    app.get("/", pipeline.GET__);

        app.get("/en", pipeline.SERVERLOG_ClientIp, pipeline.SERVERLOG_RouteTraffic, pipeline.GET_RootEN);
            app.get("/en/register", pipeline.GET_RootEN_Register); app.post("/en/register", pipeline.POST_RootEN_Register);
            app.get("/en/authenticate", pipeline.GET_RootEN_Authenticate); app.post("/en/authenticate", pipeline.POST_RootEN_Authenticate); // <TODO> redirects to "/en/authenticated"
            app.get("/en/recover", pipeline.GET_RootEN_Recover);
            app.get("/en/blog-posts", pipeline.GET_RootEN_BlogPosts);
            app.get("/en/admin", pipeline.GET_RootEN_Admin);
            // app.get("/en/");
            // app.get("/en/");
            // app.get("/en/");

        app.get("/ro", pipeline.GET_RootRO);
                app.get("/ro/%C3%AEnregistreaz%C4%83", pipeline.GET_RootRO_Înregistrează);
                app.get("/ro/autentific%C4%83", pipeline.GET_RootRO_Autentifică);   // <TODO> redirects to "/ro/autentificat"
                app.get("/ro/recupereaz%C4%83", pipeline.GET_RootRO_Recuperează);
                app.get("/ro/post%C4%83ri-blog", pipeline.GET_RootRO_PostăriBlog);
                // app.get("/ro/");
                // app.get("/ro/");
                // app.get("/ro/");
                // app.get("/ro/");
                // app.get("/ro/");

        app.get("/api/diffie-hellman-exchange");    // <TODO>
        app.get("/api/rsa-establish");
        app.get("/api/challenge-response-protocol");    // <TODO> used for sending a password to an untrusted destination (possible interception, Man-in-the-Middle); still, how is the destination itself authenticated / validated / trusted ? this is already at the level of human intelligence, unless formalized differently, to simplify the problem of identification over Internet
                                                        // to have both the server and the client inject entropy into the COM, they ought to both send a challenge to the other
        app.get("/api/bounce-back-device-identification");  // <TODO> make a few back and forth exchanges, to ~ "get a metric" for the device

        app.get("/en/authenticated/");  // <TODO> (!) the /*/authenticated/ pages can actually serve different pages depending on what authorization the expirable of the session has (!)
        app.get("/ro/autentificat/");

        app.get("/api/remember-me") // <TODO> it would be possible to set some entropy / credential_secret as a HttpOnly-Secure cookie
        app.get("/api/ține-mă-minte") // <TODO> it would be possible to set some entropy / credential_secret as a HttpOnly-Secure cookie
        app.get("/api/forget-me") // <TODO> the wording is actually incorrect; it's not the server that remembers anything, it's the client that keeps the cookies
        app.get("/api/ține-mă-minte")

        app.get("/api", pipeline.GET_API);
        app.get("/api/users", pipeline.GET_API_Users); app.delete("/api/users", pipeline.DELETE_API_Users);
        app.get("/api/get-URI/:functionality", pipeline.GET_URIByFunctionality);
        app.get("/api/get-user-secret/:user-id", pipeline.GET_API_Users);

        app.post("/api/authenticate");
        app.post("/api/register", pipeline.POST_RootEN_Register);
        app.post("/api/%C3%AEnregistreaz%C4%83", pipeline.POST_RootEN_Register);
        app.post("/api/autentific%C4%83");

        app.get("/search-user-by-nickname/:nickname", pipeline.GET_RootEN_SearchUser);
        app.get("/caută-utilizator-după-pseudonim/:pseudonim", pipeline.GET_RootRO_CautăUtilizator);

};

// <TODO> (!) take note of the routes which are PUBLIC and those which are AUTHORIZED (!), as the authorized ones will require a session cookie (HttpOnly, Secure)

// ----

module.exports = {ConfigureExpress_REST_API};

// ----

const DUMP__ConfigureExpress_REST_API = (app) => {

    app.get("/", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_Root);
    app.get("/mobile", pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.SERVERLOG_MonitorClientIP, pipeline.GET_Root);

    app.get("/en/", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // the navigation hub for English [actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    app.get("/en/register", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    app.get("/en/authenticate", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); //
    app.get("/en/exposable-credential", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    app.get("/en/session", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // choose the details for the session to-be
    app.get("/en/private-space", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // see: expirables, current session(s) [if multiple devices], traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

    app.get("/mobile/en/", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_MobileRoot);  // the navigation hub for English [actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    app.get("/mobile/en/register", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    app.get("/mobile/en/authenticate", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); //
    app.get("/mobile/en/exposable-credential", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    app.get("/mobile/en/session", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // choose the details for the session to-be
    app.get("/mobile/en/private-space", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // see: expirables, current session(s) [if multiple devices], traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...


    app.get("/dk/", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // the navigation hub for English [actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    app.get("/dk/registrere", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    app.get("/dk/autentificere", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); //
    app.get("/dk/eksponerbar-legitimation", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    app.get("/dk/session", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // choose the details for the session to-be
    app.get("/dk/privat-rum", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // see: expirables, current session(s) [if multiple devices], traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

    app.get("/mobile/dk/", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // the navigation hub for English [actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    app.get("/mobile/dk/registrere", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    app.get("/mobile/dk/autentificere", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); //
    app.get("/mobile/dk/eksponerbar-legitimation", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    app.get("/mobile/dk/session", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // choose the details for the session to-be
    app.get("/mobile/dk/privat-rum", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // see: expirables, current session(s) [if multiple devices], traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

    app.get("/ro/", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // the navigation hub for English [actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    app.get("/ro/înregistrare", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    app.get("/ro/autentificare", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); //
    app.get("/ro/credențial-expusabil", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    app.get("/ro/sesiune", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // choose the details for the session to-be
    app.get("/ro/spațiu-privat", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // see: expirables, current session(s) [if multiple devices], traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

    app.get("/mobile/ro/", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // the navigation hub for English [actually, it should be USA/UK, by country, because internationalization is not just language, but instead it is nationality and culture, and even in the same nationality there can be multiple "cultural identities" which internationalization has to match]
    app.get("/mobile/ro/înregistrare", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); // the server emits the ownership credential, "birth / being born"; define the "pseudo-identity"
    app.get("/mobile/ro/autentificare", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN); //
    app.get("/mobile/ro/credențial-expusabil", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);    // choose the access rights for / configure the "indirect, exposable, cancelable, leakable credential" <re-term> (!)
    app.get("/mobile/ro/sesiune", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // choose the details for the session to-be
    app.get("/mobile/ro/spațiu-privat", pipeline.SERVERLOG_MonitorClientIP, pipeline.SERVERSIDE_MonitorURLTraffic, pipeline.GET_RootEN);  // see: expirables, current session(s) [if multiple devices], traffic, connected devices, device history, control multi-user/multi-device "authorization of authentication", CRUD expirables, CRUD "tokens" (signed, decentralized, emitted accesses), ...

};