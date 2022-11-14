const mongoose = require("mongoose");

module.exports = mongoose.model("UserRule", new mongoose.Schema({
    userId: { type: String },
    serverId: { type: String },

    ruleAccepted: { type: Boolean },

    registeredAt: { type: Number, default: Date.now() },
}));