const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require(`fera.db`)
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("konuş")
        .setDescription("Telsizi açık olan kişilerle konuşmanı sağlar.")
        .addStringOption(z => z.setName("metin").setDescription("Telsizden ne söylemek istediğinizi yazın.").setRequired(true))
        ,
    run: async (client, interaction) => {
        let telsiz = db.fetch(`profil.${interaction.user.id}.telsiz`);
        let telsizD = db.fetch(`profil.${interaction.user.id}.telsiz.durum`) || 0;
        let telsizK = db.fetch(`profil.${interaction.user.id}.telsiz.kanal`) || 0;
        let telsizKF = db.fetch(`profil.${interaction.user.id}.telsiz.kanalfrekans`) || 0;
        let telsizT = db.fetch(`profil.${interaction.user.id}.telsiz.ton`) || 0;
        let telsizTF = db.fetch(`profil.${interaction.user.id}.telsiz.tonfrekans`) || 0;
        if (telsizD !== "Açık") return interaction.reply({content: "Bu komutu kullanmak ve telsizle konuşmak için telsizi açmalısın.",allowedMentions: {repliedUser: false}})
        let mesaj = interaction.options.getString("metin");
        let kanalTon = db.fetch(`${telsizK}-${telsizT}`) || [];
        let ses = "";
        kanalTon.forEach((userId) => {
            if (db.fetch(`profil.${userId}.telsiz.durum`) !== "Açık") return;
            if (userId === interaction.user.id) return;
            ses += `<@${userId}> `
        });
        ses += `\n\n**Telsizden Sesler Geliyor:** *${mesaj}*`
        let kanal = client.channels.cache.get("1092373264237600768");
        interaction.reply({content: "Mesaj gönderildi."})
        kanal.send(`${ses}`)
    }
}