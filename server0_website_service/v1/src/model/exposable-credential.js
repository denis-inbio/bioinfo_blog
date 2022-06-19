const mongoose = require("mongoose");

const schema = new mongoose.Schema({    // <TODO> "micro-authorization" (!)
    name: {
        type: String,
        required: true
    },
    entropy: {
        type: Buffer,
        required: true
    },
    remainingUses: {    // <TODO> if it is -1 (or any negative number), then it has unlimited uses; 0 hsa no uses, as it is the conditional for removal, besides the removalDate
        type: Number,
        required: true
    },
    removalDate: {   // <TODO> should there be a limit imposed by the system for a token's duration ?
        type: Date,
        required: true
    },

    can_edit_pseudonym: {
        type: Boolean,
        required: true
    },
    can_edit_email: {
        type: Boolean,
        required: true
    },

    // can_edit_password: {  // <TODO> should any of these still require the entry of the current password ? (most likely yes; why ? due to "expirable theft")
    //     type: Boolean,
    //     required: true
    // },
    // can_reset_credential_secret: {  // <TODO> (!) ALSO, should the credential_secret be recoverable through a token, or even resetable ?
    //     type: Boolean,
    //     required: true
    // },

    can_read_own_posts: {
        type: Boolean,
        required: true
    },
    can_create_own_posts: {
        type: Boolean,
        required: true
    },
    can_edit_own_posts: {
        type: Boolean,
        required: true
    },
    can_delete_own_posts: {
        type: Boolean,
        required: true
    },

}, {
    timestamps: true,
    id: true
});
const ExposableCredential = mongoose.model("exposableCredential", schema);

module.exports = { ExposableCredential };