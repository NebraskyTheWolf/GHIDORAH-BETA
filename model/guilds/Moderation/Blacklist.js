const mongoose = require("mongoose");

module.exports = mongoose.model("Blacklist", new mongoose.Schema({
    id: { type: String }, 
    guildId: { type: String }, 
    registeredAt: { type: Number, default: Date.now() },

    data: { type: Object, default: {
        targetId: null,
        authorId: null,
        reason: null,
        action: "kick",
        active: true
    }}
}));