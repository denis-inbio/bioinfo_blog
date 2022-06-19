// ---- ---- ----

'use strict';

const _ = require('underscore');
const childProcess = require('child_process');
const mime = require('mime');

// ---- ---- ----

const config = require("./../../config");

// ---- ---- ----

const convert = function(file, outputFormat, callback) {
    const bin = 'unoconv';
    const args = [
        '--format=' + outputFormat,
        '--stdout',
        file
    ];

    const stdout = [];
    const child = childProcess.spawn(bin, args);
    child.stdout.on('data', function (data) {
        stdout.push(data);
    });

    const stderr = [];
    child.stderr.on('data', function (data) {
        stderr.push(data);
        console.log(stderr);
    });


    child.on('exit', function () {
        if (stderr.length) {
            return callback(new Error(Buffer.concat(stderr).toString()), null);
        }

        if (callback) {
            callback(null, Buffer.concat(stdout));
        }
    });
};

const listen = function () {    // <TODO> but how do I communicate with this ? do I literally initiate a socket and send it a buffer ?
    const args = [
        '--listener',
        `--port=${config.port}`
    ];

    return childProcess.spawn("unoconv", args);
};

const detectSupportedFormats = function (options, callback) {   // <TODO> present this as a JSON, on a GET; but, it needs to integrate with the other decompression utilities
    let self = this,
        docType,
        detectedFormats = {
            document: [],
            graphics: [],
            presentation: [],
            spreadsheet: []
        },
        bin = 'unoconv';

    if (_.isFunction(options)) {
        callback = options;
        options = null;
    }

    if (options && options.bin) {
        bin = options.bin;
    }

    childProcess.execFile(bin, [ '--show' ], function (err, stdout, stderr) {
        if (err) {
            return callback(err);
        }

        // For some reason --show outputs to stderr instead of stdout
        let lines = stderr.split('\n');

        lines.forEach(function (line) {
            if (line === 'The following list of document formats are currently available:') {
                docType = 'document';
            } else if (line === 'The following list of graphics formats are currently available:') {
                docType = 'graphics';
            } else if (line === 'The following list of presentation formats are currently available:') {
                docType = 'presentation';
            } else if (line === 'The following list of spreadsheet formats are currently available:') {
                docType = 'spreadsheet';
            } else {
                let format = line.match(/^(.*)-/);

                if (format) {
                    format = format[1].trim();
                }

                let extension = line.match(/\[(.*)\]/);

                if (extension) {
                    extension = extension[1].trim().replace('.', '');
                }

                let description = line.match(/-(.*)\[/);

                if (description) {
                    description = description[1].trim();
                }

                if (format && extension && description) {
                    detectedFormats[docType].push({
                        'format': format,
                        'extension': extension,
                        'description': description,
                        'mime': mime.lookup(extension)
                    });
                }
            }
        });

        if (detectedFormats.document.length < 1 &&
            detectedFormats.graphics.length < 1 &&
            detectedFormats.presentation.length < 1 &&
            detectedFormats.spreadsheet.length < 1) {
            return callback(new Error('Unable to detect supported formats'));
        }

        callback(null, detectedFormats);
    });
};

// ---- ---- ----

module.exports = {convert, listen, detectSupportedFormats};