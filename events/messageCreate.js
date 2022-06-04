const Discord = require("discord.js");

module.exports = {
  name: "messageCreate",
  run: async function runAll(bot, message) {
    const { client, prefix, owners } = bot;

    if (!message.guild) return false;
    if (message.author.bot) return false;
    if (!message.content.startsWith(prefix)) return false;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdstr = args.shift().toLowerCase();

    let command = client.commands.get(cmdstr);
    if (!command) return false;

    let member = message.member;

    if (command.devOnly && !owners.includes(member.id)) {
      return message.reply("this ommand is only available to the bot owners");
    }

    if (
      command.permission &&
      member.permissions.missing(command.permission).length !== 0
    ) {
      return message.reply("you do not have permission to use this command");
    }

    try {
      await command.run({ ...bot, message, args });
    } catch (err) {
      let errMsg = err.toString();
      if (errMsg.starsWith("?")) {
        errMsg = errMsg.slice(1);
        await message.reply(errMsg);
      } else console.error(err);
    }
  }, //n.ping hello
};
