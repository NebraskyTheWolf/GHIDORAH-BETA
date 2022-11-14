const mongoose = require("mongoose");

module.exports = mongoose.model("entries", new mongoose.Schema({
    guildId: { type: String },
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() }
}));