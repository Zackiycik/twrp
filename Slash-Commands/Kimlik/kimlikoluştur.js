const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kimlikoluştur")
        .setDescription("Kullanıcıya bir kimlik oluştur.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageNicknames)
        .addUserOption(z => z.setName("etiket").setDescription("Kimliğine oluşturmak istediğin kullanıcıyı etiketle.").setRequired(true))
        .addStringOption(z => z.setName("isim").setDescription("Karaktere verilecek ismi yazınız.").setRequired(true))
        .addIntegerOption(z => z.setName("yas").setDescription("Karaktere verilecek yaşı yazınız.").setRequired(true).setMinValue(14).setMaxValue(10000))
        .addStringOption(options => 
            options
            .setName("cinsiyet")
            .setDescription("Karakterin cinsiyetini seçiniz.")
            .setRequired(true)
            .addChoices(
                { name: 'Erkek', value: 'erkek' },
                { name: 'Kadın', value: 'kadin' }
            )
        )
        .addStringOption(options => 
            options
            .setName("irk")
            .setDescription("Karakterin ırkını seçiniz.")
            .setRequired(true)
            .addChoices(
                { name: 'Kurt Adam', value: 'kurt' },
                { name: 'Coyote (Çakal)', value: 'coyote' },
                { name: 'İnsan', value: 'insan' },
                { name: 'Ölüm Perisi', value: 'olum' }
            )
        )
        .addStringOption(z => z.setName("dogum").setDescription("Karaktere doğum tarihini yazınız. ÖRN: 21.10.2004").setRequired(true))
        .addStringOption(z => z.setName("anne").setDescription("Karaktere anne adını giriniz.").setRequired(true))
        .addStringOption(z => z.setName("baba").setDescription("Karaktere baba adını giriniz.").setRequired(true))
        .addStringOption(options => 
            options
            .setName("iliski")
            .setDescription("Karakterin ilişki durumunu seçiniz.")
            .setRequired(true)
            .addChoices(
                { name: 'Bekar', value: 'bekar' },
                { name: 'Evli', value: 'evli' }
            )
        )
        .addAttachmentOption(z => z.setName("gorsel").setDescription("Karakterin görünecek resminin yükleyiniz").setRequired(true))
        ,
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket");
        let usernameKayit = interaction.options.getString("isim");
        let yasKayit = interaction.options.getInteger("yas");
        let cinsiyetKayit = interaction.options.getString("cinsiyet");
        let irkKayit = interaction.options.getString("irk");
        let dogumKayit = interaction.options.getString("dogum");
        let annenameKayit = interaction.options.getString("anne");
        let babanameKayit = interaction.options.getString("baba");
        let iliskiKayit = interaction.options.getString("iliski");
        let gorselKayit = interaction.options.getAttachment("gorsel");

        let cinsiyetKayitDuzen;
        switch (cinsiyetKayit) {
            case "erkek":
                cinsiyetKayitDuzen = "Erkek"
                break;
            case "kadin":
                cinsiyetKayitDuzen = "Kadın"
                break;
        }
        let irkKayitDuzen;
        switch (irkKayit) {
            case "kurt":
                irkKayitDuzen = "Kurt Adam"
                break;
            case "coyote":
                irkKayitDuzen = "Coyote (Çakal)"
                break;
            case "insan":
                irkKayitDuzen = "İnsan"
                break;
            case "olum":
                irkKayitDuzen = "Ölüm Perisi"
                break;
        }
        let iliskiKayitDuzen;
        switch (iliskiKayit) {
            case "bekar":
                iliskiKayitDuzen = "Bekar"
                break;
            case "evli":
                iliskiKayitDuzen = "Evli"
                break;
        }

        let dataSorgu = db.fetch(`profil.${user.id}.kimlik.datasorgu`);
        if (dataSorgu === true) return interaction.reply({content: `${user} adlı kullanıcının kayıtı var!`})
        db.set(`profil.${user.id}.kimlik.datasorgu`, true)
        db.set(`profil.${user.id}.kimlik.username`, usernameKayit)
        db.set(`profil.${user.id}.kimlik.yas`, yasKayit)
        db.set(`profil.${user.id}.kimlik.cinsiyet`, cinsiyetKayitDuzen)
        db.set(`profil.${user.id}.kimlik.irk`, irkKayitDuzen)
        db.set(`profil.${user.id}.kimlik.dogum`, dogumKayit)
        db.set(`profil.${user.id}.kimlik.annename`, annenameKayit)
        db.set(`profil.${user.id}.kimlik.babaname`, babanameKayit)
        db.set(`profil.${user.id}.kimlik.iliski`, iliskiKayitDuzen)
        db.set(`profil.${user.id}.kimlik.gorsel`, gorselKayit.url)
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
        .setTitle("Başarıyla Kayıt Alındı!")
        .setAuthor({name:interaction.guild.name, iconURL:interaction.guild.iconURL({dynamic:true})})
        .setFooter({text: config.Footer, iconURL: `${interaction.user.avatarURL({dynamic: true})}`})
        .setThumbnail("https://cdn.discordapp.com/attachments/1078647277679300698/1092115633245786292/1200px-Flag_of_the_United_States_black_and_white_variant_1.svg.png")
        .setImage(`${gorsel}`)
        .setDescription(`***${user} adlı kullanıcının profili:***\nn**Ad & Soyad:** ${username}\n**Yaş:** ${yas}\n**Cinsiyet:** ${cinsiyet}\n**Irk:** ${irk}\n**Doğum Tarihi:** ${dogum}\n**Anne Adı:** ${annename}\n**Baba Adı:** ${babaname}\n**İlişki Durumu:** ${iliski}\n`)
        interaction.reply({embeds: [embe]})
    }
}