const mongoose = require("mongoose");

module.exports = mongoose.model("Developers", new mongoose.Schema({
    userId: { type: String }, 
    permissionLevel: { type: String },
    registeredAt: { type: Number, default: Date.now() }
}));