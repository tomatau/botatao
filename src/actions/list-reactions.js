const messages = require('../messages')
const db = require('../db')

/**
 * List reactions
 *
 * ```
 * !list-reactions
 * ```
 *
 * @param {msg} msg
 */
async function listReactions(msg) {
  const collection = db.getCollection()

  const documents = await collection.find({}).toArray()

  if (!documents.length)
    return msg.channel.send(`There aren't any saved reactions`)

  msg.channel.send(messages.listReactionsMsg(documents))
}

module.exports = listReactions
