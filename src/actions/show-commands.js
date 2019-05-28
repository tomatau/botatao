const messages = require('../messages')

/**
 * Show commanss
 * @param {msg} msg
 */
function showCommands(msg) {
  msg.channel.send(messages.showCommandsMsg())
}

module.exports = showCommands
