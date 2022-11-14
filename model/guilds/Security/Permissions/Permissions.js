const mongoose = require("mongoose");

module.exports = mongoose.model("Permissions", new mongoose.Schema({
    permissionId: { type: String }, 
    permissionKey: { type: String }, 
    bypass: { type: Boolean },

    auth: { type: Object, default: {
        accessToken: null,
        refreshToken: null,
        issuer: null,
        expiration: null
    }},
    registeredAt: { type: Number, default: Date.now() }
}));