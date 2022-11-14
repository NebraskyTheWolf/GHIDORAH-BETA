const mongoose = require("mongoose");

module.exports = mongoose.model("Activities", new mongoose.Schema({
    userId: { type: String }, 
    serverId: { type: String },

    type: { type: String },
    action: { type: String },

    registeredAt: { type: Number, default: Date.now() }
}));