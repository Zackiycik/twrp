const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kimlik")
        .setDescription("Kullanıcının kimliğini gösterir.")
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Kimliğine bakmak istediğin kullanıcıyı etiketle."))
        ,
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket") || interaction.user
        let dataSorgu = db.fetch(`profil.${user.id}.kimlik.datasorgu`) || false
        if (dataSorgu === false) return interaction.reply({content: `${user} adlı kullanıcı kimlik açmamış!`})
        let username = db.fetch(`profil.${user.id}.kimlik.username`) || "Hata var!"
        let yas = db.fetch(`profil.${user.id}.kimlik.yas`) || "Hata var!"
        let cinsiyet = db.fetch(`profil.${user.id}.kimlik.cinsiyet`) || "Hata var!"
        let irk = db.fetch(`profil.${user.id}.kimlik.irk`) || "Hata var!"
        let dogum = db.fetch(`profil.${user.id}.kimlik.dogum`) || "Hata var!"
        let annename = db.fetch(`profil.${user.id}.kimlik.annename`) || "Hata var!"
        let babaname = db.fetch(`profil.${user.id}.kimlik.babaname`) || "Hata var!"
        let iliski = db.fetch(`profil.${user.id}.kimlik.iliski`) || "Hata var!"
        let gorsel = db.fetch(`profil.${user.id}.kimlik.gorsel`) || "https://cdn.discordapp.com/attachments/1078647277679300698/1092115633245786292/1200px-Flag_of_the_United_States_black_and_white_variant_1.svg.png"
        const embe = new Discord.EmbedBuilder()
        .setAuthor({name:interaction.guild.name, iconURL:interaction.guild.iconURL({dynamic:true})})
        .setFooter({text: config.Footer, iconURL: `${interaction.user.avatarURL({dynamic: true})}`})
        .setThumbnail("https://cdn.discordapp.com/attachments/1078647277679300698/1092115633245786292/1200px-Flag_of_the_United_States_black_and_white_variant_1.svg.png")
        .setImage(`${gorsel}`)
        .setDescription(`***${user} adlı kullanıcının profili:***\n\n**Ad & Soyad:** ${username}\n**Yaş:** ${yas}\n**Cinsiyet:** ${cinsiyet}\n**Irk:** ${irk}\n**Doğum Tarihi:** ${dogum}\n**Anne Adı:** ${annename}\n**Baba Adı:** ${babaname}\n**İlişki Durumu:** ${iliski}\n`)
        interaction.reply({embeds: [embe]})
    }
}