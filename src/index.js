
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js')
const {config} = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.login(config.token);

/** Please do not add things to memory if they are not needed all the time
    proper memory management makes these things usable long term or you will take your bot.*/
//client.embeds = require('./data/config/embeds');
//client.e = require('./data/config/emotes');
//client.c = require('./data/config/colors');
    //Just no!! this is a use security problem.
//module.exports = client;




//fs.readdirSync('./src/handlers').forEach((handler) => {
//    require(`./handlers/${handler}`)(client);
//});

