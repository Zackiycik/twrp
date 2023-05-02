const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("marketeşyaekle")
        .setDescription("Markete bir eşya eklemenizi sağlar. (Zack üşendi kod yazmakla o yüzden yazdı bunu)")
        .setDMPermission(false)
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        .addStringOption(options => 
            options
            .setName("kategori")
            .setDescription("Eşya hangi kategoriye ait olacak.")
            .setRequired(true)
            .addChoices(
                { name: 'Avcı Eşyaları', value: 'avcı' },
                { name: 'Mülkler', value: 'mulk' },
                { name: 'Mağaza', value: 'magaza' },
                { name: 'Araçlar', value: 'arac' }
            )
        )
        .addStringOption(z => z.setName("esyaismi").setDescription("Eşyaya verilecek ismi seçiniz.").setRequired(true))
        .addStringOption(z => z.setName("fiyat").setDescription("Eşyanın fiyatını yazınız.").setRequired(true))
        .addStringOption(z => z.setName("bilgilendirme").setDescription("Eşyanın bilgilendirmesini yazınız. Fazla uzun olmasın!").setRequired(true).setMaxLength(150).setMinLength(10))
        .addRoleOption(z => z.setName("rol").setDescription("Eşyanın satın alınınca hangi rol verilecek.").setRequired(true))
        ,
    run: async (client, interaction) => {
        let kategoriEkle = interaction.options.getString("kategori");
        let esyaisimEkle = interaction.options.getString("esyaismi");
        let fiyatEkle = interaction.options.getString("fiyat");
        let bilgilendirmeEkle = interaction.options.getString("bilgilendirme");
        let rolEkle = interaction.options.getRole("rol");
        let gozukcekKategori;
        let idKategori;
        switch (kategoriEkle) {
            case "avcı":
                gozukcekKategori = "Avcı Eşyaları"
                idKategori = "avcı"
                break;
            case "mulk":
                gozukcekKategori = "Mülkiyetler"
                idKategori = "mulk"
                break;
            case "magaza":
                gozukcekKategori = "Mağaza"
                idKategori = "magaza"
                break;
            case "arac":
                gozukcekKategori = "Araçlar"
                idKategori = "arac"
                break;
        }
        let eskiId = db.fetch(`marketid`) || 0;

        const sa1row = new Discord.ActionRowBuilder();
        sa1row.addComponents(new Discord.ButtonBuilder().setCustomId(`onay`).setLabel("✅").setStyle("Primary"))
        sa1row.addComponents(new Discord.ButtonBuilder().setCustomId(`iptal`).setLabel("❎").setStyle("Primary"))
        interaction.reply({content: `\`\`\`\nEŞYA EKLEME İŞLEMİ\n\`\`\`\n**İsim:** ${esyaisimEkle}\n**ID:** ${eskiId + 1}\n**Kategori:** ${gozukcekKategori}\n**Fiyat:** ${fiyatEkle}\n**Rol:** ${rolEkle}\n**Bilgilendirme:** ${bilgilendirmeEkle}\n`, components: [sa1row]})
        const filter = (i) => {return i.user.id === interaction.user.id;};
        const collector = interaction.channel.createMessageComponentCollector({ filter:filter, time: 60000 });
        collector.on('collect', async z => {
            if (z.customId === "onay") {
                db.push(`market`, {
                    idkategori: idKategori,
                    Gozukcekkategori: gozukcekKategori,
                    isim: esyaisimEkle,
                    id: eskiId + 1,
                    fiyat: fiyatEkle,
                    bilgilendirme: bilgilendirmeEkle,
                    rol: rolEkle.id,

                })
                db.add(`marketid`, 1)
                interaction.editReply({content: "Eşya eklendi!", components: []})
            } else if (z.customId === "iptal") {
                interaction.editReply({content: "Eşya eklenmedi!", components: []})
            } else return;
        })
    }
}