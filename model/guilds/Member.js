const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({
    id: { type: String }, 
    guildID: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    iconURL: { type: String, default: "https://cdn.discordapp.com/attachments/973889644401930240/982491991260680292/blank-profile-picture-973460__340.webp"}, 
    username: { type: String, default: "No username"}, 
}));