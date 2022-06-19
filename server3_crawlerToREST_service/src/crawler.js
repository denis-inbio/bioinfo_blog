/// ---- ---- ----

const jsdom = require("jsdom");

/// ---- ---- ----

const config = require("../config");

/// ---- ---- ----

const CrawlHrefsInsideElement = (dom, container_element_id, target_element_class, target_element_tag) => {
//    console.log(dom.window.document.innerHTML);
    console.log(dom.window.document.querySelectorAll("div"));

    // const byTag = container.getElementsByTagNameNS(target_element_tag);
    // const byClass = container.getElementsByClassName(target_element_class);
    //
    // console.log("By tag: ", byTag);
    // console.log("By class: ", byClass);
};

module.exports = {CrawlHrefsInsideElement};
