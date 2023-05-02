const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require(`fera.db`)
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("telsizaçkapat")
        .setDescription("Telsizi açıp kapamanıza yarar.")
        ,
    run: async (client, interaction) => {
        let tel = interaction.member.roles.cache.get("1092416927961448558")
        if (!tel) return interaction.reply({content: "Bu komutu kullanmak için önce telsizini sahibi olmalısın eğer telsizin var ise çantanda bulundurmalısın.",allowedMentions: {repliedUser: false}})
        let telsiz = db.fetch(`profil.${interaction.user.id}.telsiz`);
        let telsizD = db.fetch(`profil.${interaction.user.id}.telsiz.durum`) || 0;
        let telsizK = db.fetch(`profil.${interaction.user.id}.telsiz.kanal`) || 0;
        let telsizKF = db.fetch(`profil.${interaction.user.id}.telsiz.kanalfrekans`) || 0;
        let telsizT = db.fetch(`profil.${interaction.user.id}.telsiz.ton`) || 0;
        let telsizTF = db.fetch(`profil.${interaction.user.id}.telsiz.tonfrekans`) || 0;
        if (telsizD !== "Açık") {
            db.set(`profil.${interaction.user.id}.telsiz.durum`, "Açık")
            interaction.reply({content: "Telsizi başarıyla açtın.",allowedMentions: {repliedUser: false}})
        } else {
            db.set(`profil.${interaction.user.id}.telsiz.durum`, "Kapalı")
            interaction.reply({content: "Telsizi başarıyla kapadın.",allowedMentions: {repliedUser: false}})
        }
    }
}