const settings = require('../settings.json');
const economy = require('discord-eco');
const Discord = require('discord.js');
const cdsecconds = require('../cooldowns.json');
var cooldown = new Set();

exports.run = (Client, message, args) => {
    if (cooldown.has(message.author.id)) return message.channel.send(':x: Vous devez attendre 20 minutes entre chaque utilisation de cette commande');
    var coins_rewarded = Math.floor(Math.random() * Math.floor(settings.MxCoins));
    if (coins_rewarded < settings.MnCoins) {
        coins_rewarded = 10;
    }
    economy.updateBalance(message.author.id, coins_rewarded);
    cooldown.add(message.author.id);
    economy.fetchBalance(message.author.id).then(db => {
            var coins_embed = new Discord.RichEmbed()
                .setColor('#a2f03e')
                .addField(`${message.author.username}, vous avez bien été payer de ${coins_rewarded} KuroCoins [${db.money + coins_rewarded}]`, `Tu pourras réutiliser cette commande dans ${cdsecconds.coins_cooldown / 60} minutes`)
                .setFooter(`Compte de ${message.author.username} | BOT - KuroBank ©`, message.author.avatarURL)
                .setTimestamp()
            message.channel.send(coins_embed)
        })
        .setTimeout(() => {
            cooldown.delete(message.author.id);
        }, cdsecconds.coins_cooldown * 1000);

}

exports.conf = {
    'name': 'coins',
    'description': 'Obtient des KuroCoins en utilisant cette commande',
    'usage': `${settings.prefix}coins`
}