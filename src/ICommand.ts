import { CommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

export interface ICommand extends ChatInputApplicationCommandData {
    ephemeral: boolean;
    run: (client: Client, interaction: CommandInteraction) => Promise<void>;
}
