module.exports = {
  name: "ping",
  category: "info",
  permission: [],
  devOnly: false,
  run: async ({ client, message, args }) => {
    message.reply("pong");
  },
};
