const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require(`fera.db`)
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("telsiz")
        .setDescription("Telsiz bilgilerini gösterir.")
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
        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setColor("000001")
        .setTitle("**Telsiz Bilgileri**")
        .addFields(
            {name: "Telsiz Durum", value: `\`${telsizD|| "Kapalı"}\``, inline: false},
            {name: "Telsiz Buluduğu Kanalı", value: `\`${telsizK || 0}. Kanal, ${telsizT || 0}. Ton\``, inline: false},
            {name: "Frekans", value: `\`${telsizKF || 0}MHz\``, inline: false},
            {name: "R-CTC ve T-CTC Tone Değerleri", value: `\`${telsizTF || 0}\``, inline: false}
        )
    interaction.reply({embeds: [embed]})
    }
}