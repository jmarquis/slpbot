import { REST, Routes } from "discord.js"

import * as commands from "../commands/index.ts"
const {
  DISCORD_SLPBOT_TOKEN: token,
  DISCORD_SLPBOT_CLIENT_ID: clientId,
  DISCORD_TEST_SERVER_ID: testServerId
} = process.env

import type { RESTPostAPIApplicationCommandsJSONBody } from "discord.js"

if (!token || !clientId || !testServerId) {
  console.error("Required credentials are missing.")
  process.exit()
}

const commandData: RESTPostAPIApplicationCommandsJSONBody[] = []

for (const command of Object.values(commands)) {
  commandData.push(command.data.toJSON())
}

const rest = new REST().setToken(token)

;(async () => {
  try {
    console.log(`Registering ${commandData.length} commands...`)

    const responseData = await rest.put(
      Routes.applicationGuildCommands(clientId, testServerId),
      {
        body: commandData
      }
    )

    console.log(`Successfully registered ${responseData.length} commands.`)
  } catch (exception) {
    console.error("Exception while registering commands.", exception)
  }
})()
