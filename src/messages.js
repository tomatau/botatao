
/**
 * Show commands
 */
const showCommandsMsg = () => `${'~'}

**Add a new reaction.**
Supply a name for the reaction and a space separated list of emoji characters.
\`\`\`css
!add-reaction [reaction-name] […emojis]
\`\`\`
**List saved reactions**
\`\`\`css
!list-reactions
\`\`\`
**Add saved reactions to a message**
Supply a message id and the name of a saved reaction.
\`\`\`css
!react [msg-id] [reaction-name] ?[channel-id]
\`\`\`
**React to a message**
Supply a message id and a reaction. This is good if you want to react without the reaction being associated with yourself.
\`\`\`css
!re [msg-id] [reaction] ?[channel-id]
\`\`\`
**Clear reactions to a message**
Supply a message id and optionally a channel id. This will remove the bots reactions.
\`\`\`css
!clear-reactions [msg-id] ?[channel-id]
\`\`\`
`;

/**
 * Reaction added
 */
const reactionAddedMsg = (reactionName, reactionsList) => `${'~'}

**Reaction added:**

\`\`\`yaml
${reactionName}
\`\`\`
${reactionsList.join(' ')}
`;

/**
 * List reactions
 */
const listReactionsMsg = (reactionsList) => `${'~'}

**Saved reactions:**
${reactionsList.map(({ name, reactions }) => `
\`\`\`
${name}
\`\`\`
${reactions.join(' ')}
`
).join('')}
`;

module.exports = {
  showCommandsMsg,
  reactionAddedMsg,
  listReactionsMsg,
}
