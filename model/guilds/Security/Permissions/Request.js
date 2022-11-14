const mongoose = require("mongoose");

module.exports = mongoose.model("Request", new mongoose.Schema({
    appToken: { type: String }, 
    permissionId: { type: String }, 
    permissionKey: { type: String }
}));