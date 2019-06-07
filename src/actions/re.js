
/**
 * Re
 *
 * ```
 * !re msgId reaction ?channelId
 * ```
 *
 * @param {msg} msg
 */
async function re(msg) {
  const [, msgId, reaction, channelId] = msg.content.split(' ').filter(Boolean)

  try {
    const targetMsg = await (
      channelId
        ? msg.client.channels.get(channelId).fetchMessage(msgId)
        : msg.channel.fetchMessage(msgId)
    )

    await targetMsg.react(reaction)
  } catch (err) {
    if (err.message === 'Unknown Message')
      return msg.reply(`Message not found with that ID.`)

    msg.reply(`There was a funky error adding this message. Go tell tomatao.`)
  }
}

module.exports = re
