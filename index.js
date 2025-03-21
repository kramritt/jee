
const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

let lastVC = null;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  if (lastVC) joinVC(lastVC);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "join") {
    if (!interaction.member.voice.channel) {
      return interaction.reply("You need to be in a voice channel!");
    }
    lastVC = interaction.member.voice.channel.id;
    joinVC(lastVC);
    interaction.reply("Joined voice channel!");
  }
});

function joinVC(channelId) {
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;
  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });
}

client.login(process.env.TOKEN);
