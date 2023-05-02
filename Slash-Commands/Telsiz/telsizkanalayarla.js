const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require(`fera.db`)
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("telsizkanalayarla")
        .setDescription("Telsiz kanallarını ayarlar.")
        .addIntegerOption(z => z.setName("kanal").setDescription("Telsiz kanalını yazınız.").setRequired(true).setMaxValue(8).setMinValue(1))
        .addIntegerOption(z => z.setName("ton").setDescription("Telsiz tonunu yazınız.").setRequired(true).setMaxValue(38).setMinValue(1))
        ,
    run: async (client, interaction) => {
        let tel = interaction.member.roles.cache.get("1092416927961448558")
        if (!tel) return interaction.reply({content: "Bu komutu kullanmak için önce telsizini sahibi olmalısın eğer telsizin var ise çantanda bulundurmalısın."})
        let telsiz = db.fetch(`profil.${interaction.user.id}.telsiz`);
        let telsizD = db.fetch(`profil.${interaction.user.id}.telsiz.durum`) || 0;
        let telsizK = db.fetch(`profil.${interaction.user.id}.telsiz.kanal`) || 0;
        let telsizKF = db.fetch(`profil.${interaction.user.id}.telsiz.kanalfrekans`) || 0;
        let telsizT = db.fetch(`profil.${interaction.user.id}.telsiz.ton`) || 0;
        let telsizTF = db.fetch(`profil.${interaction.user.id}.telsiz.tonfrekans`) || 0;
        if (telsizD !== "Açık") return interaction.reply({content: "Bu komutu kullanmak ve kanalları ayarlamak için önce telsizini açmalısın."})
        let kanal = interaction.options.getInteger("kanal");
        let ton = interaction.options.getInteger("ton");
        let frekans = 0;
        let tone = 0;
        switch (kanal) {
            case 1:
                frekans = 446.00625
                break;
            case 2:
                frekans = 446.01875
                break;
            case 3:
                frekans = 446.03125
                break;
            case 4:
                frekans = 446.04375
                break;
            case 5:
                frekans = 446.05625
                break;
            case 6:
                frekans = 446.06875
                break;
            case 7:
                frekans = 446.08125
                break;
            case 8:
                frekans = 446.09375
                break;
        }
        switch (ton) {
            case 1:
                tone = 67.0
                break;
            case 2:
                tone = 71.9
                break;
            case 3:
                tone = 74.4
                break;
            case 4:
                tone = 77.0
                break;
            case 5:
                tone = 79.7
                break;
            case 6:
                tone = 82.5
                break;
            case 7:
                tone = 85.4
                break;
            case 8:
                tone = 88.5
                break;
            case 9:
                tone = 91.5
                break;
            case 10:
                tone = 94.8
                break;
            case 11:
                tone = 97.4
                break;
            case 12:
                tone = 100.1
                break;
            case 13:
                tone = 103.5
                break;
            case 14:
                tone = 107.2
                break;
            case 15:
                tone = 110.9
                break;
            case 16:
                tone = 114.8
                break;
            case 17:
                tone = 118.8
                break;
            case 18:
                tone = 123.0
                break;
            case 19:
                tone = 127.3
                break;
            case 20:
                tone = 131.8
                break;
            case 21:
                tone = 136.5
                break;
            case 22:
                tone = 141.3
                break;
            case 23:
                tone = 146.2
                break;
            case 24:
                tone = 151.4
                break;
            case 25:
                tone = 156.7
                break;
            case 26:
                tone = 162.2
                break;
            case 27:
                tone = 167.9
                break;
            case 28:
                tone = 173.8
                break;
            case 29:
                tone = 179.9
                break;
            case 30:
                tone = 186.2
                break;
            case 31:
                tone = 192.8
                break;
            case 32:
                tone = 203.5
                break;
            case 33:
                tone = 210.7
                break;
            case 34:
                tone = 218.1
                break;
            case 35:
                tone = 225.7
                break;
            case 36:
                tone = 233.6
                break;
            case 37:
                tone = 241.8
                break;
            case 38:
                tone = 250.3
                break;
        }
        db.push(`${kanal}-${ton}`, interaction.user.id)
        db.set(`profil.${interaction.user.id}.telsiz.kanal`, kanal)
        db.set(`profil.${interaction.user.id}.telsiz.kanalfrekans`, frekans)
        db.set(`profil.${interaction.user.id}.telsiz.ton`, ton)
        db.set(`profil.${interaction.user.id}.telsiz.tonfrekans`, tone)
        interaction.reply({content: `Başarıyla **${kanal} Kanal, ${ton} Ton** değeri ayarlandı.`})
    }
}