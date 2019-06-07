require('dotenv').config()
const Discord = require('discord.js')
const db = require('./db')
const addReaction = require('./actions/add-reaction')
const listReactions = require('./actions/list-reactions')
const react = require('./actions/react')
const re = require('./actions/re')
const clearReactions = require('./actions/clear-reactions')
const showCommands = require('./actions/show-commands')

const discordClient = new Discord.Client()

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`)

  db.client.connect((err) => {
    if (err) throw err

    console.log(`Connected successfully to mongo database`);
  })
})

/**
 * Listen to messages
 */
discordClient.on('message', msg => {
  const { content, author, channel } = msg

  if (author.bot) return
  if (channel.guild.ownerID !== author.id && author.username !== 'tomatao') return

  if (content.startsWith('?commands')
    || content.startsWith('!help')) {
    showCommands(msg)
  }

  if (content.startsWith('!ping')) {
    msg.reply('Pong!')
  }

  if (content.startsWith('!add-reaction')) {
    addReaction(msg)
  }

  if (content.startsWith('!list-reactions')) {
    listReactions(msg)
  }

  if (content.startsWith('!react')) {
    react(msg)
  } else if (content.startsWith('!re')) {
    re(msg)
  }

  if (content.startsWith('!clear-reactions')) {
    clearReactions(msg)
  }
})

discordClient.login(process.env.DISCORD_TOKEN)

require('http').createServer().listen(process.env.PORT || 3000)
