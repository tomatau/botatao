
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
**React to a message**
Supply a message id and the name of a saved reaction.
\`\`\`css
!react [msg-id] [reaction-name] ?[channel-id]
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
