import { Client, Collection, GatewayIntentBits } from "discord.js"

import * as commands from "./commands/index.ts"
import * as events from "./events/index.ts"

import type { Command } from "./commands/index.ts"

const { DISCORD_SLPBOT_TOKEN: token } = process.env

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

for (const subscribeToEvent of Object.values(events)) {
  subscribeToEvent(client)
}

client.commands = new Collection()

for (const command of Object.values(commands)) {
  client.commands.set(command.data.name, command)
}

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Disconnecting...")
  client.destroy()
})

client.login(token)
