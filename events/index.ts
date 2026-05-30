import { Client } from "discord.js"

export type EventSubscriber = (client: Client) => void

export * from "./clientReady.ts"
export * from "./interactionCreate.ts"
export * from "./messageCreate.ts"
