// lol, basic command
// i'm just following discord.js' guide

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("..."),
    async execute(interaction) {
        await interaction.reply("your mother is my brother");
    }
};
