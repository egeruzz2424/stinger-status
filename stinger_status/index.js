import { Client } from "discord.js";
import "dotenv/config";
import { read, readdirSync } from "fs";
import { MessageEmbed } from "discord.js";

const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES","GUILD_PRESENCES"],
  presence: {
    status: "dnd",
    activities: [{ name: "Stinger Status", type: "PLAYING" }],
  },
});

//? Event Loader
readdirSync("./events").forEach(async (file) => {
  const event = await import(`./events/${file}`).then((m) => m.default);
  event(client);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
  const log_channel = client.channels.cache.get('1167517475735351376');
  const guild = client.guilds.cache.get('1138027518339858503');
  if (newPresence.userId !== '1155389373970391172') return;

  if (newPresence.status === 'invisible' || newPresence.status === 'offline') {
      const embed = new MessageEmbed()
          .setColor('RED')
          .setTitle('Stinger Pasif!');
      log_channel.send({ embeds: [embed] });
  } else {
      const embed = new MessageEmbed()
          .setColor('GREEN')
          .setTitle('Stinger Yeniden Aktif!');
      log_channel.send({ embeds: [embed] });
  }
});

client.login(process.env.token);