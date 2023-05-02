const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require(`fera.db`)
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("haftalıksıfırla")
        .setDescription("Sunucudaki rol yapan kişilerin verilerini sıfırlar.")
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        ,
    run: async (client, interaction) => {
        let kelime = Object.keys(db.get(`profil`));
        kelime.forEach(a =>{
            db.delete(`profil.${a}.haftalıkkelime`);
        });
        interaction.reply("Sıfırlandı!")
    }
}