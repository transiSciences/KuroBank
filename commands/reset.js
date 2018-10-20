const Discord = require('discord.js');
const settings = require('../settings.json');
const economy = require('discord-eco');

exports.run = (Client, message, args) => {
    if (message.author.id !== process.env.OWNERID) return message.channel.send(":x: Cette fonction est en développement :hammer_pick:, seul le développeur peut l'utiliser");
    if (message.guild.member(message.author).hasPermission('ADMINISTRATOR') || message.author.id === '375966230265462785') {
        let usr = message.mentions.users.first();
        if (usr) {
            let total_withdrawing;
            economy.fetchBalance(usr.id).then(db => {
                let targetToWithdraw = parseInt(db.money);
                total_withdrawing = targetToWithdraw - (targetToWithdraw * 2);
            })
            economy.updateBalance(usr.id, -392);
            economy.fetchBalance(usr.id).then(db => {
                var reset_embed = new Discord.RichEmbed()
                    .setColor('#a2f03e')
                    .addField(`Reset du compte de ${usr.username}`, `Le compte de ${usr.username} a bien été reset par ${message.author.username} [${db.money}]`)
                    .setFooter(`Compte de ${usr.username} | BOT - KuroBank ©`, message.author.avatarURL)
                    .setTimestamp()
                message.channel.send(reset_embed)
            })
        } else {

        }

    } else {
        message.channel.send(":x: Tu ne peux pas reset l'économie sur ce serveur...")
    }
}

exports.conf = {
    'name': 'reset',
    'description': "Remet à zéro l'économie d'un joueur / du serveur",
    'usage': `${settings.prefix}reset <@user> / ${settings.prefix}reset`
}