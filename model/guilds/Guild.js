const mongoose = require("mongoose");

module.exports = mongoose.model("Guild", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },

    config: { type: Object, default: {
        logging: {
            alert: null,
            loggingEnabled: false
        },
        autorole: {
            unverified: null,
            verified: null,
            rules: null,
        },
        interaction: {
            enabled: true
        },
        options: {
            coreGuild: false
        },
        selfroles: {
            channelId: null,
            enabled: false
        }
    }},
    verification: { type: Object, default: {
        channels: {
            channelId: null,
            logChannel: null,
            welcomeMessage: null,
            welcomeChannel: null,
        },
        online: {
            enabled: false
        },
        type: "MANUAL",
        requirementtext: null,
        enabled: false
    }},

    xpSystem: { type: Object, default: {
        config: {
            alertChannel: null,
            xpBoost: 0,
            rankImage: false,
        },
        active: false
    }}
}));