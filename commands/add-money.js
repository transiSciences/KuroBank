const Discord = require('discord.js');
const settings = require('../settings.json');
const economy = require('discord-eco');

exports.run = (Client, message, args) => {
    if (message.guild.member(message.author).hasPermission('ADMINISTRATOR') || message.author.id === '375966230265462785') {
        let targetToUser;
        let targetToPay;
        let usr = message.mentions.users.first();
        if (usr) {
            targetToUser = usr;
            targetToPay = args[1];
        } else {
            targetToUser = message.author;
            targetToPay = args[0];
        }
        if (!targetToPay) return message.channel.send(`:x: Veuillez entrer la commande de la manère suivante: ${settings.prefix}add-money <@user> <montant>`)
        economy.updateBalance(targetToUser.id, targetToPay)
            .then(
                economy.fetchBalance(targetToUser.id).then(db => {
                    var final_add = parseInt(db.money) + parseInt(targetToPay)
                    var add_money_embed = new Discord.RichEmbed()
                        .setColor('#a2f03e')
                        .addField(`Modification du compte de ${targetToUser.username} par ${message.author.username}`, `${targetToPay} KuroCoins ont été ajouté au compte de ${targetToUser.username} [${final_add}]`)
                        .setFooter(`Modification par ${message.author.tag} | BOT - KuroBank ©`, message.author.avatarURL)
                        .setTimestamp()
                    message.channel.send(add_money_embed);
                })
            )
    } else {
        message.channel.send(":x: Tu ne peux pas ajouter de l'argent comme ça ! Tu sais c'est pas gratuit...");
    }
}

exports.conf = {
    'name': 'add-money',
    'description': "Ajoute de l'argent à un joueur",
    'usage': `${settings.prefix}add-money <@user> <montant> / ${settings.prefix}add-money <montant>`
}