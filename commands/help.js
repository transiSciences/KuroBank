const Discord = require('discord.js');
const settings = require('../settings.json');

exports.run = (Client, message, args) => {
    if (!args[0]) {
        if (message.guild.member(message.author).hasPermission('ADMINISTRATOR') || message.author.id === '375966230265462785') {
            var help_embed = new Discord.RichEmbed()
                .setColor('#5ff331')
                .setTitle(`Commandes du bot ${settings.name}`)
                .setDescription(`Le prefix est: ${settings.prefix} / Tapez help <commande> pour plus d'information`)
                .setThumbnail(Client.user.avatarURL)
                .addField('Commandes de bases', '`help`')
                .addBlankField(true)
                .addField('Commandes de banque', '`coins`, `bank`')
                .addBlankField(true)
                .addField('Commandes de gestion de la banque du serveur', '`add-money`, `remove-money`, `reset`')
                .setFooter('Created by transiSciences#6105 | BOT - KuroBank ©')
                .setTimestamp()
            message.author.send(help_embed)
            message.channel.send(':white_check_mark: Les commandes utilisables vous ont été envoyées en MP :envelope_with_arrow:')
        } else {
            var help_embed = new Discord.RichEmbed()
                .setColor('#5ff331')
                .setTitle(`Commandes du bot ${settings.name}`)
                .setDescription(`Le prefix est: ${settings.prefix} / Tapez help <commande> pour plus d'information`)
                .setThumbnail(Client.user.avatarURL)
                .addField('Commandes de bases', '`help`')
                .addBlankField(true)
                .addField('Commandes de banque', '`coins`, `bank`')
                .setFooter('Created by transiSciences#6105 | BOT - KuroBank ©')
                .setTimestamp()
            message.author.send(help_embed)
            message.channel.send(':white_check_mark: Les commandes utilisables vous ont été envoyées en MP :envelope_with_arrow:')
        }
    }
    if (args[0]) {
        let targetToCommand;
        try {
            targetToCommand = require(`./${args[0]}.js`);
        } catch (err) {
            return message.channel.send(':x: La commande spécifiée est introuvable...');
        }
        var help_targeted_embed = new Discord.RichEmbed()
            .setColor('#5ff331')
            .setTitle(`Aide commande ${targetToCommand.conf.name}`)
            .setDescription(`Le prefix est: ${settings.prefix}`)
            .setThumbnail(Client.user.avatarURL)
            .addField('Nom de la commande', targetToCommand.conf.name, true)
            .addField('Description', targetToCommand.conf.description)
            .addField('Utilisation', targetToCommand.conf.usage)
            .setFooter('Created by transiSciences#6105 | BOT - KuroBank ©')
            .setTimestamp()
        message.author.send(help_targeted_embed);
        message.channel.send(':white_check_mark: Regarde tes messages privés ;)')
    }
}

exports.conf = {
    'name': "help",
    'description': "Donne des informations sur les commandes du bot",
    'usage': `${settings.prefix}help / ${settings.prefix}help <commande>`
}