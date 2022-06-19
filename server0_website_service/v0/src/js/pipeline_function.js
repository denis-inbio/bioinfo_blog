// ----
const environment = require("./environment");

const fs = require("fs");
const mongoose = require("mongoose");
const crypto = require("crypto");

// ---- database models

const { User } = require("../model/user");
const { BlogPost } = require("../model/blog_post");

// ---- INTERMEDIARY FUNCTIONS ("Middleware")

const OPTIONS_CORS_AllowAll_OnlyGET = (req, res, next) => {
    console.log("OPTIONS_CORS_AllowAll_OnlyGET");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");

    next();
};

const OPTIONS_CORS_AllowAll = (req, res, next) => {
    console.log("OPTIONS_CORS_AllowAll");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,HEAD,PATCH");

    next();
};

// ---- PAGES [GET]

const GET__ = (req, res, next) => {
    console.log("GET /");

    // <TODO> check if file exists
    //  read it into memory
    //  if failed, then set the statusCode accordingly; if successful, set the statusCode and write binary into the body, then finalize the response to the request
    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/_/ANY_presentLanguages.html");
//    next();
};

// ----

const GET_RootEN = (req, res, next) => {
    console.log("GET /en");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root/EN_root.html");
    // next();
};

const GET_RootEN_Register = (req, res, next) => {
    console.log("GET /en/register");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_auth/EN_register.html");
    // next();
};

const GET_RootEN_Authenticate = (req, res, next) => {
    console.log("GET /en/login");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_auth/EN_authenticate.html");
    // next();
};

const GET_RootEN_Recover = (req, res, next) => {
    console.log("GET /en/recover");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_auth/EN_recover.html");
    // next();
};

const GET_RootEN_BlogPosts = (req, res, next) => {
    console.log("GET /en/blog-posts");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_content/EN_blog-posts.html");
    // next();
};

const GET_RootEN_SearchUser = (req, res, next) => {
    console.log("GET /en/search-user-by-nickname", req.params["nickname"]);

    User.find({
        nickname: req.params["nickname"]
    }, (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
            res.send(result);
        }
        next();
    });
};

const GET_RootEN_Admin = (req, res, next) => {
    console.log("GET /en/admin");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_admin/EN_admin.html");
};

// ----

const GET_RootRO = (req, res, next) => {
    console.log("GET /ro");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root/RO_root.html");
    // next();
};

const GET_RootRO_Înregistrează = (req, res, next) => {
    console.log("GET /ro/înregistrează");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_auth/RO_înregistrează.html");
    // next();
};

const GET_RootRO_Autentifică = (req, res, next) => {
    console.log("GET /ro/loghează");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_auth/RO_autentifică.html");
    // next();
};

const GET_RootRO_Recuperează = (req, res, next) => {
    console.log("GET /ro/recuperează");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_auth/RO_recuperează.html");
    // next();
};

const GET_RootRO_PostăriBlog = (req, res, next) => {
    console.log("GET /ro/postări-blog");

    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/html/root_content/RO_postări-blog.html");
    // next();
};

const GET_RootRO_CautăUtilizator = (req, res, next) => {
    console.log("GET /ro/caută-utilizator");

    // next();
};

// ---- APIs [GET]



// ---- TERMINAL FUNCTIONS [GET]

const GET_Homepage = (req, res, next) => {
    console.log("GET_Homepage");

    res.responseType = "application/html";
    res.sendFile("../html/root/ANY_presentLanguages");

    // next();
};

const GET_Favicon = (req, res, next) => {
    console.log("GET_Favicon");

    res.sendFile(process.env["FAVICON_PATH"]);

    // https://stackoverflow.com/questions/37298608/content-security-policy-the-pages-settings-blocked-the-loading-of-a-resource
    // when does a website try to get a favicon.ico ?
    // Content Security Policy: The page’s settings blocked the loading of a resource at http://localhost:2121/favicon.ico (“default-src”).
};

const GET_Files = (req, res, next) => {
    console.log("GET_Files");

    fs.readdir(process.env["FILES_DIRECTORY_PATH"], (error, files) => {
        if (error) {
            console.log(error);

            res.end();
        } else {
            console.log(files);

            res.send(files);
        }
    });

};

// ---- TERMINAL FUNCTIONS [GET JSON FORMS]

const GET_Diploma_JSON = (req, res, next) => {
    res.send({
        file: "File",
        organizer: "Organizer?",
        concurs: "String",
        concurs_classification: "String?",
        etapa: "String?",
        premiu: "String",
        student: "String",
        score: "String?",
        school: "ObjectId",
        classroom: "ObjectId",
        teacher: "Teacher?",
        coordinator: "String?",
        normativ: "ObjectId?",
        parteners: "Array?",
        signatures: "Array?",
        registration_date: "Date?",
        proof: "ObjectId?",

        createdAt: "Date",
        updatedAt: "Date",
        _id: "ObjectId"
    });

}

// ---- TERMINAL FUNCTIONS [POST]

const POST_RootEN_Register = (req, res, next) => {  // using the HTTP 1.1 protocol means that I have to manually do DiffieHellman and encrypt the private information
    console.log("POST /en/register");
    res.set("Access-Control-Allow-Origin", "*");

    console.log("Body: ", req.body);

    let pseudonym = "";
    if (req.body.pseudonym) {
        pseudonym = req.body.pseudonym;
    }
    let email = "";
    if (req.body.email) {
        email = req.body.email;
    }

    const salt = crypto.randomBytes(64);
    const password = req.body.password;
    const arrayOfBuffers = [salt, Buffer.from(password, "utf-8")];
    const saltedPasswordBuffer = Buffer.concat(arrayOfBuffers);

    const hash_function = "SHA3-512";   // <TODO> randomly select from a set of good crypto-hash functions
    const digest = crypto.createHash(hash_function).digest(saltedPasswordBuffer);

    const user = new User ({
        pseudonym: pseudonym,   // pseudonym ? ""
        email: email,
        credential: crypto.randomBytes(1024),   // <TODO> has to be unique => index search, generate until unique; actually, it should also be at some "distribution/statistical distance" from other points in space
        hashFunction: hash_function,
        hashHardness: null,
        salt: salt,
        password: digest,   // <TODO> this one doesn't need to be unique anymore, just the credential has to be
        expirationDate: null,
    });

    user.save( (error, result) => {
        if (error) {
            console.log("Error: ", error);
            res.status(500);
            res.send();
        }
        else {
            console.log(result);
            res.status(200);
            res.send(result);
        }
    });

};

const POST_RootEN_Authenticate = (req, res, next) => {
    console.log("POST /en/authenticate");
    console.log(req.body);  // body: {credential}
    console.log(req.cookie);

    // <TODO> in what encoding does the req.body.credential come though ?

    User.find({
        credential: req.body.credential
    })
        .then(
            (success) => {
                console.log(success);

                if(success.length === 0) {
                    console.log("No match found");
                    res.status(404);
                    res.send();
                }
                else if (success.length === 1) {
                    console.log("Found exactly one match");
                    res.status(200);
                    res.send();
                }
                else {
                    console.log("Problem: there are multiple identical credentials: ", success.length);
                    res.status(404);
                    res.send();
                }
            },
            (reject) => {
                res.status(404);
                res.send();
            })
        .catch( (error) => {
            console.log(error);

            res.status(404);    // technically, it should be 500, but keep it opaque
            res.send();
        });
};

// ----

const POST_Diploma = (req, res, next) => {
    console.log("POST_File");

    if (req.contentType === "application/json") {
        console.log("Received body [JSON]: ", req.body);

        res.end();
    } else if (req.contentType === "octet-stream") {
        console.log("Received body [octet-stream]: ", req.body);

        res.end();
    } else {
        console.log("Unrecognized body encoding", req.body);

        res.end();
    }
};

// ---- API FUNCTIONS

const GET_API = (req, res, next) => {
    console.log("GET /api");
    res.sendFile("/home/nq/licenta/bioinfo_blog/server0_website_service/src/js/root_api/api.json");
    // next();
};

const GET_URIByFunctionality = (req, res, next) => {
    console.log("GET /api/:functionality", req.params["functionality"]);

    // <TODO> need a way to elastically search for a match, or to offer suggestion of the URL based on the parameter being a description of the functionality
    // (!) this could very well be a "trained function" / sparse function fitting a dataset (!)
    // it should actually always return a single response, with the condition that certain points (those I would hard-code) are "guaranteed solutions"
    res.set("Access-Control-Allow-Origin", "*");
    res.send("/en/blog-posts");
    // next();
};

const GET_API_Users = (req, res, next) => {
    console.log("GET /api/users");

    User.find()
        .then(
            (success) => {  // <TODO> pagination
                res.send(success);
            },
            (failure) => {
                res.status(404);
                res.send();
            }
        );
};

const GET_API_GenerateRSAPair = (req, res, next) => {
    console.log("GET /api/rsa-pair");
    console.log(req.body);  // body: {modulusLength, publicKeyEncoding: {type, format}, privateKeyEncoding: {type, format, cipher, passphrase}}


};

// ---- DELETE, API

const DELETE_API_Users = (req, res, next) => {
    console.log("DELETE /api/users");
    console.log("User id: ", req.body.id);

    User.findByIdAndRemove(req.body.id)
        .then(
            (success) => {
                console.log(success);
                res.status(200);
                res.send();
            },
            (reject) => {
                console.log(reject);
                res.status(404);
                res.send();
            }
        )
        .catch( (error) => {
            console.log(error);
        });
};

// ---- POST-TERMINAL, SERVER-SIDE FUNCTIONS

const SERVERLOG_ClientIp = (req, res, next) => {
    console.log("Client's ip: ", req.ip);
    next();
};

const SERVERLOG_RouteTraffic = (req, res, next) => {
    console.log("Route traffic; current route is: ", req.url);
    next();
};

// ----

// note: every POST and PUT / non-simple might need the     res.set("Access-Control-Allow-Origin", "*");
// ----

module.exports = {
    OPTIONS_CORS_AllowAll, OPTIONS_CORS_AllowAll_OnlyGET,

    GET__,
        GET_RootEN, GET_RootEN_Register, GET_RootEN_Authenticate, GET_RootEN_Recover, GET_RootEN_BlogPosts, GET_RootEN_SearchUser, GET_RootEN_Admin,
        GET_RootRO, GET_RootRO_Înregistrează, GET_RootRO_Autentifică, GET_RootRO_Recuperează, GET_RootRO_PostăriBlog, GET_RootRO_CautăUtilizator,

    POST_RootEN_Register, POST_RootEN_Authenticate,


    GET_API, GET_URIByFunctionality, GET_API_Users,
    // POST_API_
    // OPTIONS_API
    DELETE_API_Users,

    SERVERLOG_ClientIp, SERVERLOG_RouteTraffic,
};