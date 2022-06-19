const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user_identifier: {
        type: String,
        required: true
    },
    HTML_content: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    id: true    // this is actually to be used as a private id for the user; the user_identifier can be used as a "credential information" (and maybe the db's id could also be used, as a "stronger credential" ?)
});
const BlogPost = mongoose.model("blogpost", schema);

module.exports = { BlogPost };