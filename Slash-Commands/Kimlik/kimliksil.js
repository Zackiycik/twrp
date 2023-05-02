const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kimliksil")
        .setDescription("Kullanıcının kimliğini siler.")
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageNicknames)
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Kimliğini sıfırlamak istediğin kişiyi etiketle.").setRequired(true))
        ,
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket") || interaction.user
        let dataSorgu = db.fetch(`profil.${user.id}.kimlik.datasorgu`) || false
        if (dataSorgu === false) return interaction.reply({content: `${user} adlı kullanıcı kimlik açmamış!`})
        db.delete(`profil.${user.id}.kimlik`)
        interaction.reply({content: "Başarıyla sıfırlandı!"})
    }
}