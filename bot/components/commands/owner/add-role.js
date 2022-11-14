const roleModel = require('../../../../model/guilds/Roles');

module.exports = {
    name: 'add-role',
    description: 'add a role to the reaction roles.',
    userPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: "role",
            description: "Select the role.",
            type: "ROLE",
            required: true
        },
        {
            name: "category",
            description: "set the category name",
            type: "STRING",
            required: true
        }
    ],
    async execute(interaction, guild) {
        const roleId = interaction.options[0];
        const category = interaction.options[1];

        const guildData = roleModel.findOne({ 
            guildId: guild.id,
            categoryName: category
        });

        const role = guild.roles.cache.find((r) => r.id === roleId);

        const newRole = {
            roleId: roleId,
            iconURL: role.iconURL(),
            counts: role.members.size()
        };

        if (guildData) {
            const roleData = guildData.roles.find((x) => x.roleId === roleId);

            if (roleData) {
                roleData = newRole;
            } else {
                guildData.roles = [...guildData.roles, newRole];
            }

            await guildData.save();
        } else {
            roleModel.create({
                guildId: guild.id,
                categoryName: category,
                roles: newRole
            });
        }
    }
}