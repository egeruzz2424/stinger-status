import { Client } from 'discord.js'
import 'dotenv/config'
import { read, readdirSync } from 'fs'
import { MessageEmbed } from 'discord.js'

import express from 'express'
const app = express()

app.get('/', function (req, res) {
	res.send('Hello World')
})

app.listen(3000)

const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'GUILD_PRESENCES',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_TYPING'
	],
	presence: {
		status: 'dnd',
		activities: [{ name: 'Stinger Status', type: 'PLAYING' }]
	}
})

//? Event Loader
readdirSync('./events').forEach(async (file) => {
	const event = await import(`./events/${file}`).then((m) => m.default)
	event(client)
})

client.on('presenceUpdate', async (oldPresence, newPresence) => {
	const user = await client.users.fetch('1021463914271223849')
	const log_channel = client.channels.cache.get('1196117407287218227')
	const guild = client.guilds.cache.get('1138027518339858503')
	if (newPresence.userId !== '1155389373970391172') return

	if (
		newPresence.status === 'invisible' ||
		newPresence.status === 'offline'
	) {
		const embed = new MessageEmbed()
			.setColor('RED')
			.setTitle('Stinger Pasif!')
		log_channel.send({ embeds: [embed] })
		user.send({ embeds: [embed] })
	} else {
		const embed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('Stinger Yeniden Aktif!')
		log_channel.send({ embeds: [embed] })
		user.send({ embeds: [embed] })
	}
})

client.login(process.env.token)
