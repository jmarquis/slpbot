import { Events } from "discord.js"

import type { EventSubscriber } from "./index.ts"

export const clientReady: EventSubscriber = client => {
  client.once(Events.ClientReady, readyClient => {
    console.log(`Connected to Discord as ${readyClient.user.tag}.`)
  })
}
