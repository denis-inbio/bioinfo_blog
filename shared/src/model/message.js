const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, {
    timestamps: true,
    id: true
});

const MessengerMessage = mongoose.model("messenger_message", schema);
module.exports = {MessengerMessage};