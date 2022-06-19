const mongoose = require("mongoose");

const schema = new mongoose.Schema({    // <TODO> (?) the server might fail; either way, it needs to periodically check for expired sessions and remove them (?); or is it fine to leave this procedure as "trigger-based" ? basically, the server knows that a session is expired, but what if it is reissued ? and to a different credential (!); OR, index the session IDs, and whenever generating a session ID check for its existence, and if it is expired then remove it nad emit a new one to a different credential
    userId: {   // <TODO> (!) the session is essentially a temporary, disposable indirection to the userId (!)
        type: mongoose.Schema.Types.ObjectId,   // <TODO> is it okay for the Session to expose the UserId ? there's two aspects: the optimization of not having to search for the user, but at the same time that who has the Session knows the "database Id of the User"; so, one might have to periodically randomly change even the database Id's of tables (!); but if so, then also the ObjectId / DatabaseId space's cardinal should try to be significantly larger than the cardinal of the samples set in it (!)
        required: true  // <TODO> ideally, having the ObjectId should not provide access to it; the problem is that if an attacker DOES get the authorization to make "some" ObjectId queries, they can make "specific attacks" and attack someone specific's information => targeted attack
    },
    expirableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    session: {  // <TODO>: Logout deletes the session from the server-side; also, (although this is less significant or likely to have effect), the server sends the client a cookie.set("session", "")
        type: Buffer,   // <e.g.> Cookie: MY_SESSION_ID=WW91IGdvdCBtZS4gRE0gbWUgb24gdHdpdHRlciBmb3IgYSBmcmVlIGNvb2tpZQ
        required: true  // <TODO> make the session entropySize adjustable; if the user is on mobile and uses mobile data, they can opt for "low session security" (and preferably shorter session lifespan); for desktop users with stable/any-pay connections though, they can opt for higher sessionEntropy [well, the maximum is that 4KB that the session storage allows for]
    },
    expirationDate: {   // <TODO> a session should NOT give access to the ability to re-issue a session; C(credential * password) >> C(session) [session keeps being re-transmitted]
        type: Date,
        required: true
    }

}, {
    timestamps: true,
    id: true
});
const Session = mongoose.model("session", schema);

module.exports = { Session };