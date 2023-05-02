const Discord = require('discord.js');
const { client, scommands } = require("../index.js");
const config = require("../Json/config.json");
let db = require("fera.db")

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    let kanallar = db.fetch(`kanallar`) || [];
    if(!kanallar.includes(message.channel.id)) return;
    let kelime = message.content.split(" ").length || 1;
    db.add(`profil.${message.author.id}.haftalıkkelime`, kelime)
    db.add(`profil.${message.author.id}.toplamkelime`, kelime)
}) 