const mongoose = require("mongoose");

module.exports = mongoose.model("Messages", new mongoose.Schema({
    id: { type: String }, 
    guild: { type: String },
    
    messageId: { type: String }, 
    messageContent: { type: String },

    registeredAt: { type: Number, default: Date.now() }
}));