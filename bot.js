const Discord = require("discord.js");
const settings = require("./settings.json");
const WelcomeChannelId = settings.WelcomeChannelId;

//const generateImage = require("./generateImage");

require("dotenv").config();

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = {
  client,
  //prefix: settings.prefix,
  prefix: "n.",
  //owners: process.env.CLIENT_ID,
  owners: ["981380028463980605"],
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) =>
  require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot;

client.login(process.env.TOKEN);

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on("messageCreate", (message) => {
//   if (message.content == "hi") {
//     message.reply("hello world");
//   }
// });

// client.on("guildMemberAdd", async (member) => {
//   const img = await generateImage(member);

//   member.guild.channels.cache.get(WelcomeChannelId).send({
//     content: `<@${member.id} Welcome to the Server !`,
//     files: [img],
//   });
// });
