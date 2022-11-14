const mongoose = require("mongoose");

module.exports = mongoose.model("Moderator", new mongoose.Schema({
    userId: { type: String }, 
    serverId: { type: String }, 

    accessLevel: { type: Number }, // 1 = STAFF // 2 = MOD // 3 = ADMIN // 4 = OWNER ONLY
    registeredAt: { type: Number, default: Date.now() },
}));