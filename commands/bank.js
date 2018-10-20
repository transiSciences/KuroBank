const settings = require('../settings.json');
const economy = require('discord-eco');
const Discord = require('discord.js');

exports.run = (Client, message, args) => {
    let usr = message.mentions.users.first();
    let targetToUser
    if (usr) {
        targetToUser = usr;
    } else {
        targetToUser = message.author;
    }
    economy.fetchBalance(targetToUser.id).then(db => {
        var bank_embed = new Discord.RichEmbed()
            .setColor('#a2f03e')
            .setTitle(`Banque de ${message.guild.name}`)
            .addField('Titulaire du compte', `${targetToUser.username}`, true)
            .addField('Solde du compte', db.money + ' KuroCoins', true)
            .setFooter(`Requested by ${message.author.tag} | BOT - KuroBank ©`, message.author.avatarURL)
            .setTimestamp()
        message.channel.send(bank_embed)
    })
}

exports.conf = {
    'name': 'bank',
    'description': "Indique le solde du compte en banque",
    'usage': `${settings.prefix}bank / ${settings.prefix}bank <user>`
}