const Discord = require("discord.js");
const dotenv = require ("dotenv/config");
const token = process.env.TOKEN;

const Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.Guilds,
  ],
  partials: [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.Message,
    Discord.Partials.GuildMember,
    Discord.Partials.User,
    Discord.Partials.GuildScheduledEvent,
    Discord.Partials.ThreadMember,
  ],
});

//Ready Events: happen when Bot is online.
Client.on("ready", (client) => {
  console.log("This bot is now online: " + client.user.tag);
});

Client.on("messageCreate", function (message) {
  const userInputText = message.content.toLowerCase();
  if (message.author.bot == false) {
    console.log("Message was written by a human");
  }

  if (userInputText == "!commands" || userInputText == "!help") {
    message.reply(
      "This bot operates on the following commands: \n!commands \n!help \n!math \n!real \n!members"
    );
  }

  //basic math
  if (userInputText == "!math") {
    message.reply("So what!");
  }

  //server age

  if (userInputText == "!real") {
    const serverBirth = new Date(message.guild.createdTimestamp).toString();

    message.reply(
      `Hello username: ${message.author.username}. ${
        !message.author.bot ? "You are not a bot!" : "You are a bot!"
      }. Also, did you know that this server was birth on ${serverBirth}`
    );
  }

  if (userInputText == "!members") {
    message.guild.members.fetch().then(
      (value) => {
        value.forEach((user) => {
          const person = user.user.username;
          const joined = user.joinedTimestamp;
          const nickName = user.user.tag;

          message.reply(`${person} aka ${nickName}\njoined on ${new Date(joined).toString()}`);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
});

Client.login(token);


