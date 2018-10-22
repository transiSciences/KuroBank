const settings = require('../settings.json');
const economy = require('discord-eco');
const Discord = require('discord.js');

exports.run = (Client, message, args) => {
    if (!message.author.id === process.env.OWNERID) return message.channel.send(":x: Cette fonction est en développement :hammer_pick:, seul le développeur peut l'utiliser");
    if (!args[1] || isNaN(args[1])) return message.channel.send(":x: Veuillez spécifier un montant numéral");
    if (args[1] <= 0) return message.channel.send(":x: Veuillez indiquer un nombre supérieur à zéro");
    economy.fetchBalance(message.author.id).then(db => {
        if (args[1] > db.money) return message.channel.send(":x: Vous ne pouvez dépenser plus que ce que vous n'avez");
        var targetToUser = message.mentions.users.first();
        var total_withdrawing = args[1] - (args[1] * 2);
        economy.updateBalance(targetToUser.id, args[1]);
        economy.updateBalance(message.author.id, total_withdrawing).then(
            economy.fetchBalance(message.author.id).then(db => {
                var pay_embed = new Discord.RichEmbed()
                    .setColor("#a2f03e")
                    .addField(`Transaction de ${args[1]} KuroCoins vers ${args[0]}`, `${args[1]} KuroCoins ont été soustrait de votre compte ${message.author.username}`)
                    .setFooter(`Transaction à l'initiative de ${message.author.username} | BOT - KuroBank ©`, message.author.avatarURL)
                    .setTimestamp()
                message.channel.send(pay_embed)
            })
        )
    })
}

exports.conf = {
    'name': 'pay',
    'description': "Permet de payer / transférer de l'argent à un autre utilisateur",
    'usage': `${settings.prefix}pay <@User> <montant>`
}