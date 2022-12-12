import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import messageReactionAdd from "./listeners/messageReactionAdd";

dotenv.config();
const token = process.env.DISCORD_TOKEN;

console.log("Bot is starting...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.User
    ]
});

ready(client);
interactionCreate(client);
messageReactionAdd(client);

console.log("Bot logging in...");

client.login(token);
