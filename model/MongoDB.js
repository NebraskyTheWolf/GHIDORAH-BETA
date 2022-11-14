// GUILDS
const messagesSchema = require('./guilds/Messages');
const memberSchema = require("./guilds/Member");
const guildSchema = require("./guilds/Guild");
const rolesSchema = require("./guilds/Roles");

// COMMONS
const entrySchema = require('./guilds/Common/VerificationEntry');
const userruleSchema = require('./guilds/Common/UserRule');
const blacklistSchema = require("./guilds/Moderation/Blacklist");

// SECURITY

const developersSchema = require('./guilds/Security/Permissions/Developers');
const activitySchema = require('./guilds/Security/Activity');

const { v4 } = require('uuid');

module.exports.fetchGuild = async function(key) {
    let guildDB = await guildSchema.findOne({ id: key });
    
    if (guildDB) {
        return guildDB;
    } else {
        guildDB = new guildSchema({
            id: key,
            registeredAt: Date.now()
        });
        await guildDB.save().catch(err => console.error(err));
        return guildDB;
    }
}

module.exports.deleteGuild = async function (guildId) {
    return await guildSchema.deleteOne({ id: guildId });
}

module.exports.fetchMember = async function(userID, guildID) {
    let member = await memberSchema.findOne({ id: userID, guildID: guildID });

    if (member) {
        return member;
    } else {
        client.users.fetch(userID).then(async (user) => {
            member = new memberSchema({
                id: userID,
                guildID: guildID,
                registeredAt: Date.now(),
                iconURL: (user.avatarURL() === null ? 'https://cdn.discordapp.com/attachments/973889644401930240/982491991260680292/blank-profile-picture-973460__340.webp' : user.avatarURL()),
                username: user.username
            });
            await member.save().catch(err => console.error(err));
            return member;
        });
    }
}

module.exports.updateMember = async function(userID, guildID) {
    client.users.fetch(userID).then(async (user) => {
        return await memberSchema.updateOne({ guildID: guildID, id: userID }, {
            id: userID,
            guildID: guildID,
            registeredAt: Date.now(),
            iconURL: (user.avatarURL() === null ? 'https://cdn.discordapp.com/attachments/973889644401930240/982491991260680292/blank-profile-picture-973460__340.webp' : user.avatarURL()),
            username: user.username
        }, { upsert: true});
    });
}

module.exports.fetchAllMember = async function(guildID) {
    return await memberSchema.find({ guildID: guildID});
}

module.exports.deleteMember = async function( userid ) {
    return await memberSchema.deleteMany({ id: userid });
}

// BLACKLIST 

module.exports.isBlacklisted = async function(userID) {
    return await blacklistSchema.findOne({ id: userID });
}

module.exports.createBlacklist = async function(userID, guildId, data) {
    let blacklist = new blacklistSchema({
        id: userID,
        guildId: guildId,
        data: {
            targetId: data.targetId,
            authorId: data.authorId,
            reason: data.reason,
            action: data.action,
            active: true
        }
    });
    await blacklist.save().catch(err => console.error(err));
    return blacklist;
}

module.exports.createMessage = async function (data) {
    let message = messagesSchema({
        id: data.userId,
        guild: data.guildId,
        registeredAt: Date.now(),

        messageId: data.messageId,
        messageContent: data.content
    });
    await message.save().catch((err) => client.logger.log('ERROR', `Error occcurred: ${err}`));
    return message;
}

module.exports.countMessagesInt = async function () {
    await messagesSchema.find({  }).count({  }, (error, result) => {
        if (error) return 0;
        return parseInt(result);
    });
}


module.exports.fetchMessage = async function (messageId) {
    return await messagesSchema.findOne({ messageId: messageId });
}

module.exports.createEntry = async function (guildId, userId) {
    let entry = entrySchema({
        guildId: guildId,
        id: userId,
        registeredAt: Date.now()
    });
    entry.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return entry;
}

module.exports.checkEntry = async function (guildId, userId) {
    return await entrySchema.findOne({ guildId: guildId, id: userId });
}

module.exports.deleteEntry = async function (guildId, userId) {
    await entrySchema.deleteOne({ guildId: guildId, id: userId });
}

module.exports.getAllEntries = async function (guildId) {
    return await entrySchema.find({ guildId: guildId });
}

module.exports.countVerify = async function (guildId) {
    await entrySchema.find({ guildId: guildId }).count({}, (error, result) => {
        if (error) return 0;
        return parseInt(result);
    });
}

module.exports.isDeveloper = async function (userId, callback) {
    const developer = await developersSchema.findOne({ userId: userId });
    if (developer)
        callback({ status: true, isDev: true, level: developer.permissionLevel });
    else
        callback({ status: false, isDev: false, level: 0 });
}

module.exports.addDeveloper = async function (userId, permissionLevel = "4") {
    const developer = developersSchema({
        userId: userId,
        permissionLevel: permissionLevel,
        registeredAt: Date.now()
    });
    developer.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return developer;
}
module.exports.acceptRules = async function (userId, serverId) {
    const rule = userruleSchema({
        userId: userId,
        serverId: serverId,

        ruleAccepted: true, 

        registeredAt: Date.now()
    });
    rule.save().catch(err => client.logger.log('ERROR', `Error occurred ${err}`));
    return rule;
}

module.exports.fetchUserRule = async function (userId, serverId) {
    return await userruleSchema.findOne({ userId: userId, serverId: serverId });
}

module.exports.fetchActivity = async function (serverId) {
    return await activitySchema.find({ serverId: serverId }, null, { 
        limit: 5, 
        sort: { 
            'registeredAt': -1 // FIND THE LATEST DOCUMENTS
        }
    });
}

module.exports.createActivity = async function (username, serverId, type, action) {
    const activity = activitySchema({
        userId: username,
        serverId: serverId,

        type: type,
        action: action,

        registeredAt: Date.now()
    });
    activity.save().catch(err => client.logger.log('ERROR', `Error occurred: ${err}`));
    return activity;
}