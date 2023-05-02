const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("para")
        .setDescription("Para ile ilgili komutlar.")
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand
                .setName('bilgi')
                .setDescription('Para bilgini gösterir.')
                .addUserOption(z => z.setName("etiket").setDescription("Parasına bakmak istediğin kullanıcıyı etiketle.")))
        .addSubcommand(subcommand =>
            subcommand
                .setName('gönder')
                .setDescription('Para göndermeni sağlar.')
                .addUserOption(z => z.setName("etiket").setDescription("Para göndermek istediğin kişiyi seç.").setRequired(true))
                .addIntegerOption(z => z.setName("miktar").setDescription("Gönderceğin para miktarını gir.").setRequired(true)))
        , 
    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === "bilgi") {
            let user = interaction.options.getUser("etiket") || interaction.user;
            let dolar = db.fetch(`profil.${user.id}.dolar`) ? db.fetch(`profil.${user.id}.dolar`) : 0;
            let sonislem = db.fetch(`profil.${user.id}.sonislem`) ? db.fetch(`profil.${user.id}.sonislem`) : "Yok!";
            let maddi = "Kötü";
            if (dolar > 5000) maddi = "Orta";
            if (dolar > 10000) maddi = "Yüksek";
            let gorsel = db.fetch(`profil.${user.id}.kimlik.gorsel`) || "https://cdn.discordapp.com/attachments/1078647277679300698/1092115633245786292/1200px-Flag_of_the_United_States_black_and_white_variant_1.svg.png"
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${user.avatarURL({dynamic: true}) ? user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("000000")
            .setDescription(`**${user} Adlı Kullanıcının Bakiyesi:**`)
            .setThumbnail(`${gorsel}`)
            .setImage("https://cdn.discordapp.com/attachments/1078647277679300698/1092115528677605477/130845-of-america-official-bank-logo.png")
            .addFields(
                { name: 'Dolar', value: `\`\`\`$${dolar}\`\`\``},
                { name: 'Son İşlem', value: `\`\`\`${sonislem}\`\`\``},
                { name: 'Maddi Durum', value: `\`\`\`${maddi}\`\`\``},
            );
            interaction.reply({embeds: [emb]})
        } else if (interaction.options.getSubcommand() === "gönder") {
            let user = interaction.options.getUser("etiket")
            if (user.id === interaction.user.id) {
                return interaction.reply({
                    content: "Kendine para gönderemezsin!",
                    ephemeral: true,
                });
            }
            let miktar = interaction.options.getInteger("miktar")
            if (!miktar) {
                return interaction.reply({
                    content: "Gönderilecek miktarı girmelisin!",
                    ephemeral: true,
                });
            }
            if (miktar < 1) {
                return interaction.reply({
                    content: "Gönderilecek miktar 0'dan büyük olmalı!",
                    ephemeral: true,
                });
            }
            db.subtract(`profil.${interaction.user.id}.dolar`, miktar)
            db.add(`profil.${user.id}.dolar`, miktar)
            db.set(`profil.${user.id}.sonislem`, `${interaction.user.username} adlı kullanıcıdan ${miktar} dolar alındı.`)
            db.set(`profil.${interaction.user.id}.sonislem`, `${user.username} adlı kullanıcıya ${miktar} dolar gönderildi.`)
            interaction.reply({content: `${interaction.user} adlı kullanıcıdan ${user} adlı kullanıcıya ${miktar} dolar gönderildi.`});
            
        }
    }
}