// ----

const { state } = require("../main");

// ----

const fs = require("fs");
const mongoose = require("mongoose");
const crypto = require("crypto");
const pathlib = require("path");

// ---- database models

const { BlogPost } = require("../model/blog-post");
const { ExposableCredential } = require("../model/exposable-credential");
const { IPTraffic } = require("../model/ip-traffic");
const { Session } = require("../model/session");
const { UrlTraffic, VALIDATE_REPAIR_UrlTraffic } = require("../model/url-traffic");
const { User } = require("../model/user");
const zlib = require("zlib");

// ----


// ----

const PIPELINE_CheckAndSend = (HTML, res) => {
    const path = pathlib.join(state["absolutePath_HTMLDirectory"], HTML);
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

const PIPELINE_ReadBodyStream = (req) => {
//     //function contentstream (req, debug, inflate) {
//
//     let encoding = (req.headers['content-encoding'] || 'identity').toLowerCase();    // "identity" -> "raw"
//     let length = req.headers['content-length'];
//     let stream;
//
//     if (inflate === false && encoding !== 'identity') {
//         throw createError(415, 'content encoding unsupported', {
//             encoding: encoding,
//             type: 'encoding.unsupported'
//         })
//     }
//
//     switch (encoding) {
//         case 'deflate':
//             stream = zlib.createInflate()
//             debug('inflate body')
//             req.pipe(stream)
//             break
//         case 'gzip':
//             stream = zlib.createGunzip()
//             debug('gunzip body')
//             req.pipe(stream)
//             break
//         case 'identity':
//             stream = req
//             stream.length = length
//             break
//         default:
//             throw createError(415, 'unsupported content encoding "' + encoding + '"', {
//                 encoding: encoding,
//                 type: 'encoding.unsupported'
//             })
//     }
//
//     return stream
//
}

const PIPELINE_ParseCookie = (req) => {

};

// ---- ---- ---- GET [simple]

const GET_App = (req, res, next) => {
    res.status(200);
    res.send("This feature is not yet available; also, it will require WebSocket compatibility");
};

const GET_Root = (req, res, next) => {
    const HTML = "UNIV_root.html";

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_MobileRoot = (req, res, next) => {
    const HTML = "mobile_UNIV_root.html";

    PIPELINE_CheckAndSend(HTML, res);
};

// ----

const GET_RootEN = (req, res, next) => {
    const HTML = "EN_root.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_RootEN_Register = (req, res, next) => {
    const HTML = "EN_register.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_RootEN_Authenticate = (req, res, next) => {
    const HTML = "EN_authenticate.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_RootEN_ExposableCredential = (req, res, next) => {
    const HTML = "EN_exposable_credential.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_RootEN_Session = (req, res, next) => {
    const HTML = "EN_session.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_RootEN_PrivateSpace = (req, res, next) => {
    const HTML = "EN_private_space.html"

    PIPELINE_CheckAndSend(HTML, res);
};

// ----

const GET_MobileRootEN = (req, res, next) => {
    const HTML = "mobile_EN_root.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_MobileRootEN_Register = (req, res, next) => {
    const HTML = "mobile_EN_register.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_MobileRootEN_Authenticate = (req, res, next) => {
    const HTML = "mobile_EN_authenticate.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_MobileRootEN_ExposableCredential = (req, res, next) => {
    const HTML = "mobile_EN_exposable_credential.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_MobileRootEN_Session = (req, res, next) => {
    const HTML = "mobile_EN_session.html"

    PIPELINE_CheckAndSend(HTML, res);
};

const GET_MobileRootEN_PrivateSpace = (req, res, next) => {
    const HTML = "mobile_EN_private_space.html"

    PIPELINE_CheckAndSend(HTML, res);
};

// ----

const GET_RootRO = (req, res, next) => {
    const HTML = "RO_origine.html"

    PIPELINE_CheckAndSend(HTML, res);
};

// ---- ---- ---- GET [API, JSON; language agnostic]

const GET_Root_API_ExposableCredential = async (req, res, next) => {
    // <TODO> authenticate by authorization (cookie{s})
    res.send(await ExposableCredential.find());
};

// ---- ---- ---- POST [API, JSON; language agnostic]

const POST_Root_API_Authenticate = async (req, res, next) => {
    console.log(req.body);

    try {
        const db_response = await User.find({
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

        const user = new User({
            pseudonym: req.body.pseudonym,
            email: req.body.email,
            credential: crypto.randomBytes(1024),
            hashFunction: "SHA3-512",
            hashHardness: 512,
            salt: salt,
            passwordDigest: digest,
            confirmDownload: false
        });

        const db_result = await user.save();
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
        const db_response_0 = await User.updateOne({_id: req.body.id}, {confirmDownload: true});
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

// ---- ---- ---- POST [HTML /en]

const POST_RootEN_Register = (req, res, next) => {
    res.status(500);
    res.send();
};

const POST_RootEN_Authenticate = (req, res, next) => {

};

const POST_RootEN_ExposableCredential = async (req, res, next) => {

};

const POST_RootEN_Session = (req, res, next) => {

};

const POST_RootEN_PrivateSpace = (req, res, next) => {

};

// ---- POST [HTML /ro

const POST_RootRO_Înregistrare = (req, res, next) => {

};

const POST_RootRO_Authenticare = (req, res, next) => {

};

const POST_RootRO_CredențialExpusabil = (req, res, next) => {

};

const POST_RootRO_Sesiune = (req, res, next) => {

};

const POST_RootRO_SpațiuPrivat = (req, res, next) => {

};

// ---- ---- ---- POST [API]

const POST_Root_API_ExposableCredential = async (req, res, next) => {
    console.log("Exposable credential: ", req.body);

// ---- Validation and setting defaults

    if (req.body.name === null || req.body.name === undefined || req.body.name.length === 0) {
        req.body.name = "default";
    }
    else if (req.body.name.length > 128) {
        req.body.name = req.body.name.substring(0, 128);
    }

    if (req.body.entropy === null || req.body.entropy === undefined) {
        req.body.entropy = "64";
    }
    else if ( Number.parseInt(req.body.entropy) > 1024) {
        req.body.entropy = "1024";
    }
    else if ( Number.parseInt(req.body.entropy) < 64) {
        req.body.entropy = "64";
    }
    else if ( isNaN(Number.parseInt(req.body.entropy)) ) {
        req.body.entropy = "64";
    }

    if(req.body.remainingUses === null || req.body.remainingUses === undefined) {
        req.body.remainingUses = "1";
    }

    const entropy = crypto.randomBytes( Number.parseInt(req.body.entropy) );
    console.log("Entropy crypto: ", entropy);

    const exposableCredential = new ExposableCredential({
        name: req.body.name,

        entropy: entropy,
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
        console.log("Entropy: ", result.entropy);
        res.send(result);
    }
    catch (error) {
        console.log(error);

        res.status(500);
        res.send();
    }
};

// ---- DELETE [API]

const DELETE_Root_API_Register = async (req, res, next) => {
    console.log(req.body);

    try {
        const db_response = await User.deleteOne({
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

// ---- ---- ---- GET [resource]

// ---- ---- ---- SERVER-SIDE FUNCTIONS

const SERVERSIDE_MonitorClientIP = async (req, res, next) => {
    try {
        const fulfilled = await IPTraffic.find({
            ip: req.ip
        });

        if (fulfilled.length === 1) {
            let ipTraffic = fulfilled[0];
            ipTraffic.visits += 1;

            ipTraffic = await ipTraffic.save();    // <TODO> (!) how to ensure it has enough time ? I mean, if there were to be 1000's of requests per second, then this will SURELY have race conditions (!)
            // this right now is literally blocking the server into waiting for the DB
            console.log(ipTraffic);
        }
        else {
            let ipTraffic = new IPTraffic({
                ip: req.ip,
                visits: 1
            });

            ipTraffic = await ipTraffic.save();
            console.log(ipTraffic);
        }
    }
    catch (error) {
        console.log(error);
    }

    next();
};

const SERVERSIDE_MonitorURLTraffic = async (req, res, next) => {  // <TODO> check that the method is always upper-case, and one of the expected kinds: [GET, POST, PUT, DELETE, OPTIONS]
    try {
        const fulfilled = await UrlTraffic.find({
            url: req.url
        });

        if (fulfilled.length === 1) {
            let urlTraffic = fulfilled[0];

            urlTraffic = VALIDATE_REPAIR_UrlTraffic(urlTraffic);

            if(req.method === "GET") {
                if(urlTraffic.GET > 0)
                    urlTraffic.GET += 1;
                else
                    urlTraffic.GET = 1;
            }
            else if(req.method === "POST") {
                if(urlTraffic.POST > 0)
                    urlTraffic.POST += 1;
                else
                    urlTraffic.POST = 1;
            }
            else if(req.method === "PUT") {
                if(urlTraffic.PUT > 0)
                    urlTraffic.PUT += 1;
                else
                    urlTraffic.PUT = 1;
            }
            else if(req.method === "DELETE") {
                if(urlTraffic.DELETE > 0)
                    urlTraffic.DELETE += 1;
                else
                    urlTraffic.DELETE = 1;
            }
            else if(req.method === "OPTIONS") {
                if(urlTraffic.OPTIONS > 0)
                    urlTraffic.OPTIONS += 1;
                else
                    urlTraffic.OPTIONS = 1;
            }

            urlTraffic = await urlTraffic.save();    // <TODO> (!) how to ensure it has enough time ? I mean, if there were to be 1000's of requests per second, then this will SURELY have race conditions (!)
            // this right now is literally blocking the server into waiting for the DB
            console.log(urlTraffic);
        }
        else {
            console.log("Traffic: ", fulfilled);
        }
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
    GET_App,
    GET_Root,
        GET_RootEN, GET_RootEN_Register, GET_RootEN_Authenticate, GET_RootEN_ExposableCredential, GET_RootEN_Session, GET_RootEN_PrivateSpace,
        GET_RootRO,
    GET_MobileRoot,
        GET_MobileRootEN, GET_MobileRootEN_Register, GET_MobileRootEN_Authenticate, GET_MobileRootEN_ExposableCredential, GET_MobileRootEN_Session, GET_MobileRootEN_PrivateSpace,

    POST_RootEN_Register, POST_RootEN_Authenticate, POST_RootEN_ExposableCredential, POST_RootEN_Session, POST_RootEN_PrivateSpace,
    POST_RootRO_Înregistrare, POST_RootRO_Authenticare, POST_RootRO_CredențialExpusabil, POST_RootRO_Sesiune, POST_RootRO_SpațiuPrivat,

    GET_Root_API_ExposableCredential,
    POST_Root_API_Authenticate, POST_Root_API_Register, POST_Root_API_RegisterConfirm, POST_Root_API_ExposableCredential,
    DELETE_Root_API_Register, DELETE_Root_API_ExposableCredential,

    SERVERSIDE_MonitorClientIP, SERVERSIDE_MonitorURLTraffic,
};