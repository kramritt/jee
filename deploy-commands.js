const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName("join")
    .setDescription("Make the bot join your voice channel"),
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering commands...");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands.map((cmd) => cmd.toJSON()),
    });
    console.log("Commands registered!");
  } catch (error) {
    console.error(error);
  }
})();
