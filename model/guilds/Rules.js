const mongoose = require("mongoose");

module.exports = mongoose.model("Rules", new mongoose.Schema({
    guildId: { type: String },
    
    rules: { type: Object, default: {}}, 
    active: { type: Boolean, default: false }
}));