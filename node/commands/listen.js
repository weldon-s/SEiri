// read from an audio file
// test command

const { SlashCommandBuilder } = require("discord.js");
const { dsStart } = require("../dsHelper.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("listen")
        .setDescription("Test command, not for final use"),
    async execute(interaction) {
        if (dsStart(5)) interaction.reply("Listening!");
        else interaction.reply({content: "Something went wrong...", ephemeral: true});
    }
};
