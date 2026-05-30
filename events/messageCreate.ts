import fs from "node:fs"
import { Events } from "discord.js"

import type { EventSubscriber } from "./index.ts"
import path from "node:path"
import { pipeline } from "node:stream/promises"

export const messageCreate: EventSubscriber = client => {
  client.on(Events.MessageCreate, async interaction => {
    console.log(`Message received: ${interaction.content}`)

    const attachment = interaction.attachments.first()
    if (!attachment) return

    const url = new URL(attachment.url)
    if (url.pathname.substring(url.pathname.lastIndexOf(".")) !== ".slp") return

    const filename = url.pathname.substring(url.pathname.lastIndexOf("/") + 1)

    const response = await fetch(url)

    if (!response.ok || !response.body) {
      console.log("Failed to download attachment")
      return
    }

    const file = fs.createWriteStream(path.join("./tmp", filename))

    await pipeline(response.body, file)
  })
}
