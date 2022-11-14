module.exports = {
    name: 'guildDelete',
    type: 'event',
    async execute(guild) {
        await client.Database.fetchGuild(guild.id);
    }
}