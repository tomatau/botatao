const db = require('../db')

/**
 * React
 * @param {msg} msg
 */
async function react(msg) {
  const [, msgId, reactionName, channelId] = msg.content.split(' ')
  const collection = db.getCollection()

  try {
    const targetMsg = await (
      channelId
        ? msg.client.channels.get(channelId).fetchMessage(msgId)
        : msg.channel.fetchMessage(msgId)
    )

    if (!targetMsg)
      return

    const [document] = await collection.find({ name: reactionName }).toArray()

    if (!document)
      return msg.reply(`No reaction found with that name.`)

    for (const reaction of document.reactions) {
      await targetMsg.react(reaction)
    }
  } catch (err) {
    if (err.message === 'Unknown Message')
      return msg.reply(`Message not found with that ID.`)

    msg.reply(`There was a funky error adding this message. Go tell tomatao.`)
  }
}

module.exports = react
