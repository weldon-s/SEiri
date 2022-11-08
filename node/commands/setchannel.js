// sets the bot to watch this channel

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-channel")
        .setDescription("Run this command in a channel to make the bot watch this channel"),
    async execute(interaction) {
        interaction.client.activeGuild = interaction.guildId;
        interaction.client.activeChannel = interaction.channelId;
        await interaction.reply({content: "Watching! :eyes:"});
    }
};
