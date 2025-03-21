const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;

const commands = [
  new SlashCommandBuilder().setName("join").setDescription("makes bot join vc"),
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("registering slash commands...");
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands.map((command) => command.toJSON()),
    });
    console.log("slash commands registered");
  } catch (error) {
    console.error(error);
  }
})();
