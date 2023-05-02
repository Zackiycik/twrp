const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kayıt")
        .setDescription("Kullanıcıyı kayıt etmenizi sağlar.")
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageNicknames)
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Kaydetmek istediğiniz kişiyi etiketleyin.").setRequired(true))
        ,
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket");
        client.users.cache.get(user.id).roles.remove("1078797948307120260");
        client.users.cache.get(user.id).roles.add("1078798298581831680");
        interaction.reply(`${user} adlı kullanıcı kayıt edildi!`)
    }
}