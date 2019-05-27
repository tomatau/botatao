require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

const REACTIONS = {}

function showCommands(msg) {
  msg.channel.send(`${'~'}

**Add a new reaction.**
Supply a name for the reaction and a space separated list of emoji characters.
\`\`\`css
!add-reaction [reaction-name] […emojis]
\`\`\`
**List saved reactions**
\`\`\`css
!list-reactions
\`\`\`
**React to a message**
Supply a message id and the name of a saved reaction.
\`\`\`css
!react [msg-id] [reaction-name]
\`\`\`
`
  )
}

function addReaction(msg) {
  const [, name, ...reactions] = msg.content.split(' ')

  if (!name)
    return msg.reply(`The reaction needs a name buddy.`)

  if (!reactions.length)
    return msg.reply(`The reaction needs... reactions.`)

  REACTIONS[name] = reactions.filter(Boolean)

  msg.channel.send(`${'~'}
**Reaction added:**

\`\`\`yaml
${name}
\`\`\`
${REACTIONS[name].join(' ')}
`
  )
}

function listReactions(msg) {
  if (!Object.keys(REACTIONS).length)
    return msg.channel.send(`There aren't any saved messages`)

  msg.channel.send(`${'~'}
**Saved reactions:**
${Object.entries(REACTIONS).map(([name, reactions]) =>
`
\`\`\`yaml
${name}
\`\`\`
${REACTIONS[name].join(' ')}
`
).join('')}
`)
}

async function react(msg) {
  const [, msgId, reactionName] = msg.content.split(' ')

  const targetMsg = await msg.channel.fetchMessage(msgId)

  for (const reaction of REACTIONS[reactionName]) {
    await targetMsg.react(reaction)
  }
}

client.on('message', msg => {
  if (msg.content.startsWith('?commands') || msg.content.startsWith('!help')) {
    showCommands(msg)
  }

  if (msg.content.startsWith('!ping')) {
    msg.reply('Pong!')
  }

  if (msg.content.startsWith('!add-reaction')) {
    addReaction(msg)
  }

  if (msg.content.startsWith('!list-reactions')) {
    listReactions(msg)
  }

  if (msg.content.startsWith('!react')) {
    react(msg)
  }
})

client.login(process.env.DISCORD_TOKEN)
