import { SlashCommandBuilder } from "discord.js"
import type { Command } from "../commands"

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds with pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!")
  }
}
