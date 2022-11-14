const { SlashCommandBuilder } = require('discord.js');

class AbstractCommand extends SlashCommandBuilder {
    constructor() {
        if (this.constructor === AbstractCommand)
            throw new Error("Abstract classes can't be instantiated.");
    }

    async execute(interaction);
    async ToJSON();
}

module.exports = () => new AbstractCommand();