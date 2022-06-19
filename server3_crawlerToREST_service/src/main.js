/// ---- ---- ----

const crawler = require("./src/crawler");
const jsdom = require("jsdom");
const fetch = require("node-fetch");
const got = require("got");
const {JSDOM} = jsdom;

/// ---- ---- ----

const target_url = "https://3lib.net/dl/510075/f4f138";
const target_element_id_0 = "booksMosaicBoxContainer";
const target_element_id_1 = "bMosaicBox";
const target_elements_tag = "a";
const target_elements_class = "book-loading";

/// ---- ---- ----

// <TODO> make this a server for serving requests to crawl an HTML resource / web-page (!)

/// ---- ---- ----

got(target_url)
    .then(response => {
        const document = new JSDOM(response.body.toString()).window.document;
        const container = document.querySelector("#bMosaicBox");
        const elements = container.querySelectorAll("a");
        console.log("Container: ", container, "Elements: ", elements);
    });
