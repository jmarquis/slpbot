import { Events, MessageFlags } from "discord.js"

import type { EventSubscriber } from "./index.ts"

export const interactionCreate: EventSubscriber = client => {
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    console.log(`Received command: ${interaction.commandName}`)

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command registered for "${interaction.commandName}".`)
      return
    }

    try {
      await command.execute(interaction)
    } catch (exception) {
      console.error(
        `Exception while executing command ${interaction.commandName}.`,
        exception
      )
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral
        })
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral
        })
      }
    }
  })
}
