const mongoose = require("mongoose");

module.exports = mongoose.model("Verification", new mongoose.Schema({
    id: { type: String }, // USER ID
    guildId: { type: String }, 
    registeredAt: { type: Number, default: Date.now() },

    code: { type: String }, // 000-000-00 // USER MODE CODE

    verified: { type: Boolean, default: false }, // VERIFIED STATUS
    verifiedId: { type: String }, // UUID V4

    data: { type: Object, default: {}} // EXTRA DATA
}));