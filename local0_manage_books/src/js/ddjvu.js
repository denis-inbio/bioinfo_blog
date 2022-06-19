// ---- ---- ----

const childProcess = require('child_process');

// ---- ---- ----

const convert = function(file, outputFormat, quality = null, callback) {
    if(!quality) {
        quality = "0.9"
    }
    const bin = 'ddjvu';
    const args = [
        `-format=${outputFormat}`,
        `-quality=${quality}`,
        file
    ];

    const child = childProcess.spawn(bin, args);

    child.on('exit', function () {
        if (callback) {
            callback();
        }
    });
};

// ---- ---- ----

module.exports = {convert};