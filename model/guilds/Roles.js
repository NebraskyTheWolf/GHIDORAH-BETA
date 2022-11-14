const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
    guildId: String,
    categoryName: String,
    roles: Array
});

module.exports = mongoose.model("roles-selections", rolesSchema);