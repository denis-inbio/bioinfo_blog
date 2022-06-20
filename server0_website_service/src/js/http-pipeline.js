// ---- Pipeline, server state

const { state } = require("../main");

// ---- Compression, encryption, etc.

const crypto = require("crypto");
const zlib = require("zlib");

// ---- Filesystem

const fs = require("fs");
const pathlib = require("path");

// ---- Database models

const { BlogPost } = require("../model/blog-post"); // <TODO> every model should have a "validation function" (~ setting "good defaults" and/or normalizing the data)
const { Device } = require("../model/device");  // <TODO> every model should have a ~ "database / collection initialization function"
const { ExposableCredential } = require("../model/exposable-credential");
const { IPTraffic, VALIDATE_REPAIR_IpTraffic } = require("../model/ip-traffic");
const { Session } = require("../model/session");
const { UrlTraffic, VALIDATE_REPAIR_HttpUrlTraffic } = require("../model/url-traffic");
const { OwnershipCredential } = require("../model/ownership-credential");
    // User -> OwnershipCredential


// ---- ---- ---- Pipeline functions

const PIPELINE_CheckAndSendHtml = (directoryName, HtmlName, res) => {
    const path = pathlib.join(state["AbsolutePath_NonSecureHtmlDirectory"], directoryName, HtmlName);
    fs.exists(path, (exists) => {
        if (exists) {
            res.sendFile(path);
        }
        else {
            res.status(404);
            res.send();
        }
    });
};

const PIPELINE_ParseCookieForSession = (req) => {

};

// ---- ---- ---- GET [Protocol]

const GET_ProtocolRedirect = (req, res, next) => {  // <TODO> need to also add the domain name to .env
    res.redirect(`https://localhost:${state.HttpSslPort}`);
};

// ---- ---- ---- GET [Favicon]

const GET_Favicon = (req, res, next) => {
    fs.exists(state["AbsolutePath_FaviconFile"], (exists) => {
        if (exists) {
            res.sendFile( state["AbsolutePath_FaviconFile"] );
        }
        else {
            res.status(404);
            res.send();
        }
    });
};

// ---- ---- ---- GET [Html]

// ---- GET [Html, root, international language]

const GET_App = (req, res, next) => {
    res.status(200);
    res.send("This feature is not yet available; also, it will require WebSocket compatibility");
};

const GET_Root = (req, res, next) => {
    const htmlName = "INTER_root.html";
    const directoryName = "root";
    
    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

const GET_MobileRoot = (req, res, next) => {
    const htmlName = "mobile_INTER_root.html";
    const directoryName = "root";

    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

// ---- GET [Html, /en, english]

const GET_RootEN = (req, res, next) => {
    const htmlName = "EN_entry.html";
    const directoryName = "entry";

    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

const GET_RootEN_Register = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/en/register`);
};

const GET_RootEN_Authenticate = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/en/authenticate`);
};

const GET_RootEN_ExposableCredential = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/en/exposable-credential`);
};

const GET_RootEN_Session = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/en/session`);
};

const GET_RootEN_PrivateSpace = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/en/private-space`);
};

// ---- GET [Html, /mobile/en, english]

const GET_MobileRootEN = (req, res, next) => {
    const htmlName = "mobile_EN_entry.html";
    const directoryName = "entry";

    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

const GET_MobileRootEN_Register = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/en/register`);
};

const GET_MobileRootEN_Authenticate = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/en/authenticate`);
};

const GET_MobileRootEN_ExposableCredential = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/en/exposable-credential`);
};

const GET_MobileRootEN_Session = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/en/session`);
};

const GET_MobileRootEN_PrivateSpace = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/en/private-space`);
};

// ---- GET [Html, /dk, dansk]

const GET_RootDK = (req, res, next) => {
    const htmlName = "DK_indgang.html";
    const directoryName = "entry";

    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

const GET_RootDK_Registrere = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/dk/register`);
};

const GET_RootDK_Autentificere = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/dk/autentificere`);
};

const GET_RootDK_EksponerbarLegitimation = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/dk/eksponerbar-legitimation`);
};

const GET_RootDK_Session = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/dk/session`);
};

const GET_RootDK_PrivatRum = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/dk/privat-rum`);
};

// ---- GET [Html, /mobile/dk, dansk]

const GET_MobileRootDK = (req, res, next) => {
    const htmlName = "mobile_DK_indgang.html";
    const directoryName = "entry";

    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

const GET_MobileRootDK_Registrere = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/dk/register`);
};

const GET_MobileRootDK_Autentificere = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/dk/autentificere`);
};

const GET_MobileRootDK_EksponerbarLegitimation = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/dk/eksponerbar-legitimation`);
};

const GET_MobileRootDK_Session = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/dk/session`);
};

const GET_MobileRootDK_PrivatRum = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/dk/privat-rum`);
};

// ---- GET [Html, /ro, română]

const GET_RootRO = (req, res, next) => {
    const htmlName = "RO_intrare.html";
    const directoryName = "entry";

    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

const GET_RootRO_Înregistrare = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/ro/înregistrează`);
};

const GET_RootRO_Autentificare = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/ro/autentifică`);
};

const GET_RootRO_CredențialExpusabil = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/ro/credențial-expusabil`);
};

const GET_RootRO_Sesiune = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/ro/sesiune`);
};

const GET_RootRO_SpațiuPrivat = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/ro/spațiu-privat`);
};

// ---- GET [Html, /mobile/ro, română]

const GET_MobileRootRO = (req, res, next) => {
    const htmlName = "mobile_RO_intrare.html";
    const directoryName = "entry";

    PIPELINE_CheckAndSendHtml(directoryName, htmlName, res);
};

const GET_MobileRootRO_Înregistrare = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/ro/înregistrează`);
};

const GET_MobileRootRO_Autentificare = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/ro/autentifică`);
};

const GET_MobileRootRO_CredențialExpusabil = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/ro/credențial-expusabil`);
};

const GET_MobileRootRO_Sesiune = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/ro/sesiune`);
};

const GET_MobileRootRO_SpațiuPrivat = (req, res, next) => {
    res.redirect(`https://localhost:${state.HttpSslPort}/mobile/ro/spațiu-privat`);
};

// ---- ---- ---- API

// ---- GET [API]

const GET_Root_API_ExposableCredential = async (req, res, next) => {
    // <TODO> authenticate by authorization (cookie{s})
    res.send(await ExposableCredential.find());
};

// ---- POST [API]

const POST_Root_API_Authenticate = async (req, res, next) => {
    console.log(req.body);

    try {
        const db_response = await OwnershipCredential.find({
            credential: req.body
        });
        console.log("Result: ", db_response);

        res.status(200);
        res.send();
    }
    catch (error) {
        console.log(error);

        res.status(500);
        res.send();
    }
};

const POST_Root_API_Register = async (req, res, next) => {
    console.log(req.body);

    try {
        let salt;
        let digest;
        if (req.body.password) {
            const password = req.body.password;
            salt = crypto.randomBytes(64);
            const arrayOfBuffers = [salt, Buffer.from(password, "utf-8")];
            const saltedPasswordBuffer = Buffer.concat(arrayOfBuffers);
            const hash_function = "SHA3-512";   // <TODO> randomly select from a set of good crypto-hash functions
            digest = crypto.createHash(hash_function).update(saltedPasswordBuffer).digest();
        }

        const ownershipCredential = new OwnershipCredential({
            pseudonym: req.body.pseudonym,
            email: req.body.email,
            credential: crypto.randomBytes(1024),
            hashFunction: "SHA3-512",
            hashHardness: 512,
            salt: salt,
            passwordDigest: digest,
            confirmDownload: false
        });

        const db_result = await ownershipCredential.save();
        console.log(db_result);

        res.send( { id: db_result._id, credential: db_result.credential } );
    }
    catch (error) {
        console.log(error);

        res.status(500);
        res.send();
    }
};

const POST_Root_API_RegisterConfirm = async (req, res, next) => {
    console.log(req.body);

    try {
        const db_response_0 = await OwnershipCredential.updateOne({_id: req.body.id}, {confirmDownload: true});
        console.log(db_response_0);

        res.status(200);
        res.send();
    }
    catch (error) {
        console.log(error);

        res.status(500);
        res.send();
    }
};

const POST_Root_API_ExposableCredential = async (req, res, next) => {
    console.log("Exposable credential: ", req.body);

    // ---- Validation and setting defaults

    if (req.body.name === null || req.body.name === undefined || req.body.name.length === 0) {
        req.body.name = "default";
    }
    else if (req.body.name.length > 128) {
        req.body.name = req.body.name.substring(0, 128);
    }

    if (req.body.credential === null || req.body.credential === undefined) {
        req.body.credential = "64";
    }
    else if ( Number.parseInt(req.body.credential) > 1024) {
        req.body.credential = "1024";
    }
    else if ( Number.parseInt(req.body.credential) < 64) {
        req.body.credential = "64";
    }
    else if ( isNaN(Number.parseInt(req.body.credential)) ) {
        req.body.credential = "64";
    }

    if(req.body.remainingUses === null || req.body.remainingUses === undefined) {
        req.body.remainingUses = "1";
    }

    const credential = crypto.randomBytes( Number.parseInt(req.body.credential) );
    console.log("credential crypto: ", credential);

    const exposableCredential = new ExposableCredential({
        name: req.body.name,

        credential: credential,
        remainingUses: Number.parseInt(req.body.remainingUses),
        removalDate: Date.parse(req.body.removalDate),

        can_edit_pseudonym: req.body.can_edit_pseudonym,
        can_edit_email: req.body.can_edit_email,

        can_read_own_posts: req.body.can_read_own_posts,
        can_create_own_posts: req.body.can_create_own_posts,
        can_edit_own_posts: req.body.can_edit_own_posts,
        can_delete_own_posts: req.body.can_delete_own_posts,
    });

    // ---- Commit to Database and response(s)

    try {
        const result = await exposableCredential.save();
        // console.log(result);
        console.log("credential: ", result.credential);
        res.send(result);
    }
    catch (error) {
        console.log(error);

        res.status(500);
        res.send();
    }
};

// ---- PUT [API]

// ---- DELETE [API]

const DELETE_Root_API_Register = async (req, res, next) => {
    console.log(req.body);

    try {
        const db_response = await OwnershipCredential.deleteOne({
            _id: req.body._id
        });
        console.log(db_response);
        res.send(db_response);
    }
    catch (error) {
        console.log(error);
    }
};

const DELETE_Root_API_ExposableCredential = async (req, res, next) => {
    console.log("Object _id body: ", req.body);

    try {
        const db_response = await ExposableCredential.deleteOne({
            _id: req.body._id
        });

        if (db_response) {
            console.log("Delete response: ", db_response);

            res.send(db_response);
        }
    }
    catch (error) {
        console.log(error);
    }
};

// ---- ---- ---- SERVER-SIDE FUNCTIONS

const SERVERSIDE_MonitorClientIPTraffic = async (req, res, next) => {
    try {
        const fulfilled = await IPTraffic.find({
            ip: req.ip
        });

        let ipTraffic;

        if (fulfilled.length === 1) {
            ipTraffic = fulfilled[0];
        }
        else {
            ipTraffic = new IPTraffic({
                ip: req.ip,
                visits: 1
            });

            ipTraffic = VALIDATE_REPAIR_IpTraffic(ipTraffic);
        }

        ipTraffic.visits += 1;

        ipTraffic = await ipTraffic.save();
        // console.log(ipTraffic);
    }
    catch (error) {
        console.log(error);
    }

    next();
};

const SERVERSIDE_MonitorURLTraffic = async (req, res, next) => {
    console.log(req.protocol);

    try {
        const fulfilled = await UrlTraffic.find({
            url: req.url,
            protocol: req.protocol
        });

        let urlTraffic;

        if (fulfilled.length === 1) {
            urlTraffic = fulfilled[0];
        }
        else {

            for (let index = 0; index < fulfilled.length; index++) {
                await fulfilled[index].deleteOne();
            }

            urlTraffic = new UrlTraffic({
                url: req.url,
                protocol: "http",
                GET: 0,
                POST: 0,
                PUT: 0,
                DELETE: 0,
                OPTIONS: 0
            });
        }

        urlTraffic = VALIDATE_REPAIR_HttpUrlTraffic(urlTraffic);

        if(req.method.toUpperCase() === "GET") {
            if(urlTraffic.GET > 0)
                urlTraffic.GET += 1;
            else
                urlTraffic.GET = 1;
        }
        else if(req.method.toUpperCase() === "POST") {
            if(urlTraffic.POST > 0)
                urlTraffic.POST += 1;
            else
                urlTraffic.POST = 1;
        }
        else if(req.method.toUpperCase() === "PUT") {
            if(urlTraffic.PUT > 0)
                urlTraffic.PUT += 1;
            else
                urlTraffic.PUT = 1;
        }
        else if(req.method.toUpperCase() === "DELETE") {
            if(urlTraffic.DELETE > 0)
                urlTraffic.DELETE += 1;
            else
                urlTraffic.DELETE = 1;
        }
        else if(req.method.toUpperCase() === "OPTIONS") {
            if(urlTraffic.OPTIONS > 0)
                urlTraffic.OPTIONS += 1;
            else
                urlTraffic.OPTIONS = 1;
        }

        urlTraffic = await urlTraffic.save();
        // console.log(urlTraffic);
    }
    catch (error) {
        console.log(error);
    }

    next();
};

// ---- ---- ---- SERVER-SIDE TRAFFIC CONTROL

const SERVERSIDE_FilterTrafficByUrlFrequency = (req, res, next) => {
    console.log("Filter traffic by URL frequency", req.url);
};

const SERVERSIDE_ThrottleTrafficByUrlFrequency = (req, res, next) => {
    console.log("Throttle traffic by URL frequency", req.url);
};

const SERVERSIDE_FilterTrafficByClientIP = () => {

};  // case: block or timeout a request from the same device

// note: every POST and PUT / non-simple might need the     res.set("Access-Control-Allow-Origin", "*");
// ----

module.exports = {
    GET_ProtocolRedirect,

    GET_Favicon,

    GET_App,

    GET_Root,
        GET_RootEN, GET_RootEN_Register, GET_RootEN_Authenticate, GET_RootEN_ExposableCredential, GET_RootEN_Session, GET_RootEN_PrivateSpace,
        GET_RootDK, GET_RootDK_Registrere, GET_RootDK_Autentificere, GET_RootDK_EksponerbarLegitimation, GET_RootDK_Session, GET_RootDK_PrivatRum,
        GET_RootRO, GET_RootRO_Înregistrare, GET_RootRO_Autentificare, GET_RootRO_CredențialExpusabil, GET_RootRO_Sesiune, GET_RootRO_SpațiuPrivat,

    GET_MobileRoot,
        GET_MobileRootEN, GET_MobileRootEN_Register, GET_MobileRootEN_Authenticate, GET_MobileRootEN_ExposableCredential, GET_MobileRootEN_Session, GET_MobileRootEN_PrivateSpace,
        GET_MobileRootDK, GET_MobileRootDK_Registrere, GET_MobileRootDK_Autentificere, GET_MobileRootDK_EksponerbarLegitimation, GET_MobileRootDK_Session, GET_MobileRootDK_PrivatRum,
        GET_MobileRootRO, GET_MobileRootRO_Înregistrare, GET_MobileRootRO_Autentificare, GET_MobileRootRO_CredențialExpusabil, GET_MobileRootRO_Sesiune, GET_MobileRootRO_SpațiuPrivat,

    GET_Root_API_ExposableCredential,
    POST_Root_API_Authenticate, POST_Root_API_Register, POST_Root_API_RegisterConfirm, POST_Root_API_ExposableCredential,
    // PUT_Root_API_x,
    DELETE_Root_API_Register, DELETE_Root_API_ExposableCredential,

    SERVERSIDE_MonitorClientIPTraffic, SERVERSIDE_MonitorURLTraffic,

};
