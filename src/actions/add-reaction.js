const messages = require('../messages')
const db = require('../db')

/**
 * Add reaction
 * @param {msg} msg
 */
async function addReaction(msg) {
  const [, name, ...reactions] = msg.content.split(' ')
  const collection = db.getCollection()

  if (!name)
    return msg.reply(`The reaction needs a name buddy.`)

  if (!reactions.length)
    return msg.reply(`The reaction needs... reactions.`)

  const newDoc = {
    name,
    reactions: reactions.filter(Boolean)
  }

  await collection.insertOne(newDoc)
  // REACTIONS[name] = reactions.filter(Boolean)

  msg.channel.send(messages.reactionAddedMsg(newDoc.name, newDoc.reactions))
}

module.exports = addReaction
