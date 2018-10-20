const Discord = require('discord.js');
const Client = new Discord.Client();
const settings = require('./settings.json');
const moment = require('moment');
const fs = require('fs');
const chalk = require('chalk');
const log = message => {
    console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${message}`);
}

fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    log(chalk.blue(`Loading a total of ${files.length} commands`));
    files.forEach(f => {
        const props = require(`./commands/${f}`);
        log(chalk.green(`Loading command ${props.conf.name}.`))
    })
})

Client.on('ready', () => {
    Client.user.setActivity('Restricted mode disable | k!help', { type: 'WATCHING' });
    log(`Logged in as: ${settings.name} ${settings.version} ${settings.lang}`);
})

Client.on('message', message => {
    if (message.channel.type === 'dm') return;
    if (message.author === Client.user) return;
    if (message.content.indexOf(settings.prefix) !== 0) return;
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(Client, message, args);
    } catch (err) {}
})

Client.login(process.env.TOKEN);