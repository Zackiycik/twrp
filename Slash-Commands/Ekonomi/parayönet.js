const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("paraekle")
        .setDescription("Etiketlenen kullanıcının veya bir rolün parasını yönetir.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('üye')
                .setDescription('Etiketlenen kullanıcının parasını yönetir.')
                .addUserOption(z => z.setName("etiket").setDescription("Parası yönetilcek kişiyi etiketle.").setRequired(true))
                .addIntegerOption(z => z.setName("miktar").setDescription("Yönetilcek miktarı girmelisin.").setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('rol')
                .setDescription('Etiketlenen kullanıcının parasını yönetir.')
                .addRoleOption(option => option.setName("rol").setDescription("Bir rolü etiketle.").setRequired(true))
                .addIntegerOption(option => option.setName("miktar").setDescription("Yatırılacak miktar.").setRequired(true)))
        , 
    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === "üye") {
            let user = interaction.options.getUser("etiket")
            let miktar = interaction.options.getInteger("miktar")
            if (!user) {
                return interaction.reply({
                    content: "Birini etiketlemelisin!",
                    ephemeral: true,
                });
            }
            if (!miktar) {
                return interaction.reply({
                    content: "Gönderilecek miktarı girmelisin!",
                    ephemeral: true,
                });
            }
            db.add(`profil.${user.id}.dolar`, miktar)
            db.set(`profil.${user.id}.sonislem`, `${interaction.user.username} adlı yetkili ${miktar} Dolar eklemiştir.`)
            interaction.reply({content: `${interaction.user} adlı yetkili ${user} adlı kullanıcıya ${miktar} Dolar ekledi.`})
        } else if (interaction.options.getSubcommand() === "rol") {
            let rol = interaction.options.getRole("rol");
            if (!rol) {
                return interaction.reply({
                    content: "Birini etiketlemelisin!",
                    ephemeral: true,
                });
            }
            let miktar = interaction.options.getInteger("miktar");
            if (!miktar) {
                return interaction.reply({
                    content: "Gönderilecek miktarı girmelisin!",
                    ephemeral: true,
                });
            }
            if (miktar < 1) {
                return interaction.reply({
                    content: "Gönderilecek miktarı düzgün girmelisin!",
                    ephemeral: true,
                });
            }
            interaction.guild.members.cache.forEach(userr => {
                if (userr.roles.cache.has(rol.id)) {
                    db.add(`profil.${userr.id}.dolar`, miktar)
                    db.set(`profil.${userr.id}.sonislem`, `${miktar} dolar ${rol.name} rolüne para eklenmiştir.`)
                }
            })
            interaction.reply({content: `${interaction.user} adlı yetkili ${rol} adlı role ${miktar} dolar eklendi.`})
        }
    }
}