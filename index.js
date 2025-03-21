
const { Client, GatewayIntentBits, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

const LAST_VC_FILE = "last_vc.txt";
const TOKEN = process.env.TOKEN;

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  if (fs.existsSync(LAST_VC_FILE)) {
    const lastVC = fs.readFileSync(LAST_VC_FILE, "utf8");
    const [guildId, channelId] = lastVC.split(",");
    const guild = client.guilds.cache.get(guildId);
    const channel = guild?.channels.cache.get(channelId);
    
    if (channel && channel.type === ChannelType.GuildVoice) {
      joinVC(channel);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "join") {
    if (!interaction.member.voice.channel) {
      return interaction.reply("join a vc first");
    }

    joinVC(interaction.member.voice.channel);
    fs.writeFileSync(LAST_VC_FILE, `${interaction.guild.id},${interaction.member.voice.channel.id}`);
    interaction.reply("joined vc");
  }
});

function joinVC(channel) {
  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
}

client.login(TOKEN);
