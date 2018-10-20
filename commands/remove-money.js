const Discord = require('discord.js');
const settings = require('../settings.json');
const economy = require('discord-eco');

exports.run = (Client, message, args) => {
    if (message.guild.member(message.author).hasPermission('ADMINISTRATOR') || message.author.id === '375966230265462785') {
        let targetToUser;
        let targetToWithdraw;
        let usr = message.mentions.users.first();
        if (usr) {
            targetToUser = usr;
            targetToWithdraw = args[1];
        } else {
            targetToUser = message.author;
            targetToWithdraw = args[0];
        }
        if (!targetToWithdraw) return message.channel.send(`:x: Veuillez entrer la commande de la manère suivante: ${settings.prefix}remove-money <@user> <montant>`)
        total_withdrawing = targetToWithdraw - (targetToWithdraw * 2);
        economy.updateBalance(targetToUser.id, total_withdrawing)
            .then(
                economy.fetchBalance(targetToUser.id).then(db => {
                    var final_withdraw = parseInt(db.money) + parseInt(total_withdrawing);
                    var add_money_embed = new Discord.RichEmbed()
                        .setColor('#a2f03e')
                        .addField(`Modification du compte de ${targetToUser.username} par ${message.author.username}`, `${targetToWithdraw} KuroCoins ont été prélevé du compte de ${targetToUser.username} [${final_withdraw}]`)
                        .setFooter(`Modification par ${message.author.tag} | BOT - KuroBank ©`, message.author.avatarURL)
                        .setTimestamp()
                    message.channel.send(add_money_embed);
                })
            )
    } else {
        message.channel.send(":x: Tu ne peux pas retirer de l'argent comme ça ! Tu sais c'est pas si simple...");
    }
}

exports.conf = {
    'name': 'remove-money',
    'description': "Retire de l'argent à un joueur",
    'usage': `${settings.prefix}remove-money <@user> <montant> / ${settings.prefix}remove-money <montant>`
}