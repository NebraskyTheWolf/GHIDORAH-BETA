const mongoose = require("mongoose");

module.exports = mongoose.model("Payload", new mongoose.Schema({
    payloadId: { type: String }, 
    payloadKey: { type: String }, 
    payloadExpiration: { type: Boolean, default: false },

    accessToken: { type: String },
    refreshToken: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    payloadData: { type: Object, default: {}}
}));