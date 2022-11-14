module.exports = {
    name: 'message',
    type: 'event',
    async execute(message) {
        if (message.guild === undefined) return;
        if (message.author.bot) return;

        client.Database.createMessage({
            userId: message.author.id,
            guildId: message.guild.id,

            messageId: message.id,
            content: 'REDACTED'
        });
    }
}