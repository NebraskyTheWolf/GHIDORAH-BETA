module.exports = {
    name: 'guildMemberAdd',
    type: 'event',
    async execute(member) {
        const guild = await client.Database.fetchGuild(member.guild.id);
        const role = member.guild.roles.cache.get(guild.config.autorole.unverified);
    
        await member.roles.add(role);
        await client.Database.fetchMember(member.user.id, member.guild.id);
    }
}