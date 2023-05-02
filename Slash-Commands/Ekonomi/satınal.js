const Discord = require('discord.js')
const config = require("../../Json/config.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("panel")
        .setDescription("Market sisteminin panelini atar. (Crew/Zack)")
    ,
    run: async (client, interaction) => {
        let market = db.fetch(`market`) || [];
        let veriiii;

        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder().setCustomId('avcı').setEmoji('🏹').setStyle(Discord.ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId('mülk').setEmoji('🏠').setStyle(Discord.ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId('mağza').setEmoji('💍').setStyle(Discord.ButtonStyle.Secondary),
                new Discord.ButtonBuilder().setCustomId('araclar').setEmoji('🚗').setStyle(Discord.ButtonStyle.Secondary),
            )
        const embed = new Discord.EmbedBuilder()
            .setDescription('```fix\n' + '🏹 Avcı Eşyaları\n🏠 Mülkler\n💍 Mağaza\n🚗 Galeri' + '```')
            .setColor('000001')
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({ dynamic: true }) ? interaction.user.avatarURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true })}` })
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        interaction.reply({ embeds: [embed], components: [row] })

        function onaylama(id) {
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder().setLabel('Onaylıyorum.').setEmoji('✅').setCustomId('onay').setStyle(Discord.ButtonStyle.Primary),
                    new Discord.ButtonBuilder().setLabel('Hayır, teşekkürler.').setEmoji('❎').setCustomId('red').setStyle(Discord.ButtonStyle.Danger),
                )
            interaction.editReply({ content: 'Bu eşyayı almak istediğinize emin misiniz?', embeds: [], components: [row] })
            const filter = (i) => { return i.user.id === interaction.user.id; };
            const collector1 = interaction.channel.createMessageComponentCollector({ filter: filter, time: 60000 });
            collector1.on('collect', async zac => {
                if (zac.customId === "onay") {
                    zac.deferUpdate();
                    let item = market.find(itemin => itemin.id == id)
                    interaction.member.roles.add([item.rol])
                    db.subtract(`profil.${interaction.user.id}.dolar`, item.fiyat)
                    db.set(`profil.${interaction.user.id}.sonislem`, `Marketten ${item.isim} adlı eşya ${item.fiyat} dolardan satın alındı.`)
                    interaction.editReply({ content: 'Başarıyla belirttiğiniz eşyayı aldınız.', components: [] })
                    collector1.stop();
                } else if (zac.customId === "red") {
                    z.deferUpdate();
                    interaction.editReply({ content: 'Başarıyla işleminiz iptal edildi.', components: [] })
                    collector1.stop();
                } else {
                    return;
                }
            })
        }


        const filter = (i) => { return i.user.id === interaction.user.id; };
        const collector = interaction.channel.createMessageComponentCollector({ filter: filter, time: 60000 });
        collector.on('collect', async crew => {
            if (crew.customId === "avcı") {
                crew.deferUpdate();
                let liste1 = [];
                let yazı1 = "";
                market.forEach((item) => {
                    if (item.idkategori != "mulk" || item.idkategori != "magaza" || item.idkategori != "arac") return;
                    liste1.push({ label: `${item.isim}`, description: `Fiyat: ${item.fiyat}`, value: `${item.id}` })
                    yazı1 += `<@&${item.rol}>: **${item.bilgilendirme}\n**`
                })
                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder().setCustomId('select').setPlaceholder('Ürün Seç').addOptions(liste1)
                    )
                const crewEmbed = new Discord.EmbedBuilder()
                    .setDescription(yazı1)
                    .setColor('000001')
                    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
                    .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({ dynamic: true }) ? interaction.user.avatarURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true })}` })
                interaction.editReply({ embeds: [crewEmbed], components: [row] })
                const filter = (i) => { return i.user.id === interaction.user.id; };
                const collector1 = interaction.channel.createMessageComponentCollector({ filter: filter, time: 60000 });
                collector1.on('collect', async z => {
                    if (z.values[0] > 0) {
                        z.deferUpdate();
                        onaylama(z.values[0]);
                        collector1.stop();
                    }
                })
            } else if (crew.customId === "mulk") {
                crew.deferUpdate();
                let liste2 = [];
                let yazı2 = "";
                market.forEach((item) => {
                    if (item.idkategori != "arac" || item.idkategori != "avcı" || item.idkategori != "magaza") return;
                    liste2.push({ label: `${item.isim}`, description: `Fiyat: ${item.fiyat}`, value: `${item.id}` })
                    yazı2 += `<@&${item.rol}>: **${item.bilgilendirme}\n**`
                })
                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder().setCustomId('select').setPlaceholder('Ürün Seç').addOptions(liste2)
                    )
                const crewEmbed = new Discord.EmbedBuilder()
                    .setDescription(yazı2)
                    .setColor('000001')
                    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
                    .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({ dynamic: true }) ? interaction.user.avatarURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true })}` })
                interaction.editReply({ embeds: [crewEmbed], components: [row] })
                const filter = (i) => { return i.user.id === interaction.user.id; };
                const collector1 = interaction.channel.createMessageComponentCollector({ filter: filter, time: 60000 });
                collector1.on('collect', async z => {
                    if (z.values[0] > 0) {
                        z.deferUpdate();
                        onaylama(z.values[0]);
                        collector1.stop();
                    }
                })
            } else if (crew.customId === "magaza") {
                crew.deferUpdate();
                let liste3 = [];
                let yazı3 = "";
                market.forEach((item) => {
                    if (item.idkategori != "arac" || item.idkategori != "mulk" || item.idkategori != "avcı") return;
                    liste3.push({ label: `${item.isim}`, description: `Fiyat: ${item.fiyat}`, value: `${item.id}` })
                    yazı3 += `<@&${item.rol}>: **${item.bilgilendirme}\n**`
                })
                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder().setCustomId('select').setPlaceholder('Ürün Seç').addOptions(liste3)
                    )
                const crewEmbed = new Discord.EmbedBuilder()
                    .setDescription(yazı3)
                    .setColor('000001')
                    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
                    .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({ dynamic: true }) ? interaction.user.avatarURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true })}` })
                interaction.editReply({ embeds: [crewEmbed], components: [row] })
                const filter = (i) => { return i.user.id === interaction.user.id; };
                const collector1 = interaction.channel.createMessageComponentCollector({ filter: filter, time: 60000 });
                collector1.on('collect', async z => {
                    if (z.values[0] > 0) {
                        z.deferUpdate();
                        onaylama(z.values[0]);
                        collector1.stop();
                    }
                })
            } else if (crew.customId === "arac") {
                crew.deferUpdate();
                let liste4 = [];
                let yazı4 = "";
                market.forEach((item) => {
                    if (item.idkategori != "avcı" || item.idkategori != "mulk" || item.idkategori != "magaza") return;
                    liste4.push({ label: `${item.isim}`, description: `Fiyat: ${item.fiyat}`, value: `${item.id}` })
                    yazı4 += `<@&${item.rol}>: **${item.bilgilendirme}\n**`
                })
                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder().setCustomId('select').setPlaceholder('Ürün Seç').addOptions(liste)
                    )
                const crewEmbed = new Discord.EmbedBuilder()
                    .setDescription(yazı)
                    .setColor('000001')
                    .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
                    .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({ dynamic: true }) ? interaction.user.avatarURL({ dynamic: true }) : client.user.avatarURL({ dynamic: true })}` })
                interaction.editReply({ embeds: [crewEmbed], components: [row] })
                const filter = (i) => { return i.user.id === interaction.user.id; };
                const collector1 = interaction.channel.createMessageComponentCollector({ filter: filter, time: 60000 });
                collector1.on('collect', async z => {
                    if (z.values[0] > 0) {
                        z.deferUpdate();
                        onaylama(z.values[0]);
                        collector1.stop();
                    }
                })
            } else return;
        })
    }
}