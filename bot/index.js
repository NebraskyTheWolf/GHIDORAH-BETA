const fs = require('node:fs');
const path = require('node:path');
const { _loadFile } = require('../utils/FileHelper');
const { Discord, Client, Intents, Collection } = require('discord.js');
const discordModals = require('discord-modals');
const MongoDB = require('../model/MongoDB');

class Bot extends Client {
	constructor(token) {
		super({
			partials: ["MESSAGE", "USER", "REACTION"],
			disableMentions: "everyone",
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
				Intents.FLAGS.GUILD_WEBHOOKS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_MESSAGE_TYPING,
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
				Intents.FLAGS.DIRECT_MESSAGE_TYPING,
			],
			ws: { properties: { $browser: "Discord iOS" } }
		});
		this.config = require('../config');
		global.client = this;
		client.Database = MongoDB;
		discordModals(this);
		this.launch();
	}

	launch() {
		this._applyCollections();
		
		_loadFile(__dirname, 'events', new Collection());
		this.login(process.env.TOKEN);
	}

	_applyCollections() {
		client.commands = new Collection();
		client.buttons = new Collection();
		client.modals = new Collection();
		client.tasks = new Collection();
	}
}

module.exports = (token) => new Bot(token);