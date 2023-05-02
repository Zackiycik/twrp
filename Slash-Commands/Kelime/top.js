const Discord = require("discord.js")
const config = require("../../Json/config.json")
const db = require(`fera.db`)
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("top")
        .setDescription("Sunucudaki rol yapan kişilerin kelimeleri gözükür.")
        ,
    run: async (client, interaction) => {
        let user = db.get(`profil`);
        let userlar = Object.keys(user || {}).map(md => {return {id: md, Total: (db.get(`profil.${md}.haftalıkkelime`) || 0) }}).sort((a, b) => b.Total - a.Total).map(a => a);
        let kelimeamk = [];
        let userlartop = Object.keys(user || {}).map(md => {return {id: md, Total: (db.get(`profil.${md}.toplamkelime`) || 0) }}).sort((a, b) => b.Total - a.Total).map(a => a);
        let kelimeamktop = [];
        for (let i = 0; i < 10; i++) {
            if(userlar[i]){
                let kelime = db.get(`profil.${userlar[i].id}.haftalıkkelime`) || 0;
                kelimeamk.push({sıra: i+1, name: `<@${userlar[i].id}>`, value: `Kelime: ${kelime}`});
            }
        }
        for (let i = 0; i < 10; i++) {
            if(userlartop[i]){
                let kelimetop = db.get(`profil.${userlartop[i].id}.toplamkelime`) || 0;
                kelimeamktop.push({sıra: i+1, name: `<@${userlartop[i].id}>`, value: `Kelime: ${kelimetop}`});
            }
        }
        let kelime_UwU = "";
        kelimeamk.forEach(a =>{
            kelime_UwU += `${a.sıra}┆${a.name} \`${a.value}\`\n`;
        });
        kelime_UwU = kelime_UwU.replace("1┆", "🥇┆")
        kelime_UwU = kelime_UwU.replace("2┆", "🥈┆")
        kelime_UwU = kelime_UwU.replace("3┆", "🥉┆")
        let kelime_UwUtop = "";
        kelimeamktop.forEach(a =>{
            kelime_UwUtop += `${a.sıra}┆${a.name} \`${a.value}\`\n`;
        });
        kelime_UwUtop = kelime_UwUtop.replace("1┆", "🥇┆")
        kelime_UwUtop = kelime_UwUtop.replace("2┆", "🥈┆")
        kelime_UwUtop = kelime_UwUtop.replace("3┆", "🥉┆")
        let sira1 = "";
        for (var i = 0; i < userlar.length; i++) {
            if (userlar[i].id === interaction.user.id) {
            sira1 += `${i + 1}`
            }
        }
        let sira2 = "";
        for (var i = 0; i < userlartop.length; i++) {
            if (userlartop[i].id === interaction.user.id) {
            sira2 += `${i + 1}`
            }
        }
        let keladam = db.fetch(`profil.${interaction.user.id}.haftalıkkelime`) || 0;
        let keladam2 = db.fetch(`profil.${interaction.user.id}.toplamkelime`) || 0;
        const embe = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setColor("000001")
        .setDescription(`\`\`\`\nHaftalık Roleplay Listesi\n\`\`\`\n${kelime_UwU}\n\n${sira1}┆${interaction.user} \`${keladam}\`\n\n\`\`\`\nToplam Roleplay Listesi\n\`\`\`\n${kelime_UwUtop}\n\n${sira2}┆${interaction.user} \`${keladam2}\``)
        interaction.reply({embeds: [embe]})
    }
}