// i'm using semicolons because it makes me comfy
const fs = require("node:fs");
const path = require("node:path");
const { Client, Events, GatewayIntentBits, Collection, MessageManager } = require('discord.js');
const { token } = require("./config.json");

// intents needed to view guilds, as well as new messages
// i suppose it's possible to try and use slash commands to send messages instead :Hmm:
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection(); // i don't know what a collection is, but discordjs.guide says to include this
client.activeGuild = false;
client.activeChannel = false;

const commandsPath = path.join(__dirname, "commands"); // for cross-os functionality i guess. this is only ever being run on linux so idc
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js")); // bro all this shit is overkill we're going to have like 2 commands lmao

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) { // don't parse degenerate commands
        client.commands.set(command.data.name, command);
    } else {
        console.log(`${filePath} is degenerate`);
    }
}

// left off at https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

client.once(Events.ClientReady, c => {
    console.log(`Bot loaded as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`No command matching ${interaction.commandName} was found`);
    } 

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'ERROR EXECUTING COMMAND', ephemeral: true});
    }
});

client.on(Events.MessageCreate, message => {
    if (message.guildId != client.activeGuild || message.channelId != client.activeChannel) return;

    console.log(`new message\n${message.content}`);
    fs.writeFile("tts.txt", message.content, (e) => {
        if (e) console.error(e);
        else {
            console.log("Message saved");
        }
    });
});

client.login(token);
