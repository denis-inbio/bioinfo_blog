/// ---- ---- ---- .env

const path = require("path");

/// ---- ---- ---- npm modules/requires

    // https://stackoverflow.com/questions/15957529/can-i-install-a-npm-package-from-javascript-running-in-node-js

/// ---- ---- ---- .env

const ENV_ParsePathIntoArray = (path_csv) => {
    const path_array = [];
    let current = "";

    for (let index = 0; index < path_csv.length; index++) {
        if (path_csv[index] === ',') {
            path_array.push(current);
            current = "";
        }
        else {
            current += path_csv[index];
        }
    }

    return path_array;
};

const ENV_PathArrayToPath = (path_array) => {
    if (path_array.length >= 2) {
        let current = path.join(path_array[0], path_array[1]);

        for (let index = 2; index < path_array.length; index++) {
            current = path.join(current, path_array[index]);
        }
    }
    else if (path_array.length === 1) {
        return path_array;
    }
    else {
        return null;
    }
};

const ENV_Mongoose = () => {
    return process.env["URI_PREFIX_MONGODB"] && process.env["DATABASES"] && process.env["URI_SUFFIX_MONGODB"];
}

const ENV_Express = () => {

};

const ENV_HttpServer = () => {

};

const ENV_FilesystemDatabase = () => {

};

/// ---- ---- ---- get specific resources

// const SPECIFICFILE_HTML = () => {
//     return
// };

/// ---- ---- ----

module.exports = {ENV_Express, ENV_FilesystemDatabase, ENV_Mongoose, ENV_HttpServer, ENV_ParsePathIntoArray, ENV_PathArrayToPath};