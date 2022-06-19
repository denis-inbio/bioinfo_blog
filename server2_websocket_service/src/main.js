// ----

require("dotenv").config();

const config = require("./config");
const callback = require("./src/js/callback");

const mongoose = require("mongoose");
const express = require("express");
const websocket = require("ws");

const app = express();
const http_server = require("http").createServer(app);
const wss = new websocket.Server({
    server: http_server
});

// ----

wss.on("connection", (socket) => {
    console.log("A new client has connected");
    socket.send("Welcome, client !");

    socket.on("message", (message) => {
        console.log("Received message: ", message);
        socket.send("Received the message");
        socket.send(message);

        setTimeout(() => {
            socket.send("Trigger the client");
        }, 2000);
    });
});

app.get("/", (req, res) => {
    console.log("GET /");
    res.send("/ accessed - this is separate from the websocket ?");
});

http_server.listen(config.port, callback.HttpServerStartup);