
/**
 * Clear reactions
 *
 * ```
 * !clear-reactions msgId ?channelId
 * ```
 *
 * @param {msg} msg
 */
async function clearReactions(msg) {
  const [, msgId, channelId] = msg.content.split(' ').filter(Boolean)

  try {
    const targetMsg = await (
      channelId
        ? msg.client.channels.get(channelId).fetchMessage(msgId)
        : msg.channel.fetchMessage(msgId)
    )

    await Promise.all(
      targetMsg.reactions
        .filter(reaction => reaction.me)
        .map(reaction => reaction.remove())
    )

    msg.reply(`My reactions have been swept away sir!`)
  } catch (err) {
    if (err.message === 'Unknown Message')
      return msg.reply(`Message not found with that ID.`)

    console.error(err)
    msg.reply(`There was a funky error clearing the reactions to this message. Go tell tomatao.`)
  }
}

module.exports = clearReactions
