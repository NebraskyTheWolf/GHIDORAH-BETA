module.exports = {
    name: 'interactionCreate',
    type: 'event',
    async execute(interaction) {
        if (interaction.customId === undefined) return;
        if (interaction.guild === undefined) return;

        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const guild = await client.Database.fetchGuild(interaction.guild.id);
        
    }
}