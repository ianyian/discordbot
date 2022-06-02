const Discord = require("discord.js");
const settings = require("./settings.json");
const WelcomeChannelId = settings.WelcomeChannelId;

const generateImage = require("./generateImage");

require("dotenv").config();

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.content == "hi") {
    message.reply("hello world");
  }
});

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);

  member.guild.channels.cache.get(WelcomeChannelId).send({
    content: `<@${member.id} Welcome to the Server !`,
    files: [img],
  });
});

client.login(process.env.TOKEN);
//client.login(settings.token);
