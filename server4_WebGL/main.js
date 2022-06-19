const fs = require("fs");

const express = require("express");
const app = express();
const port = 3001;
const shaders_directory = "/home/nq/licenta/bioinfo_blog/server4_WebGL/src/shaders/";
app.get("/shaders-fs", (req, res, next) => {
    console.log("GET /shaders-fs");
    fs.readdir(shaders_directory, (error, files) => {
        if (error) {
            res.status(404);
            res.contentType("application/json");
            res.send({});
        }
        else {
            res.status(200);
            res.contentType("application/json");
            res.send(files);
            next();
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});