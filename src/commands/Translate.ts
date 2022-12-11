import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType } from "discord.js";
import { ICommand } from "../ICommand";
import translator from "../Language/translator";

export const Translate: ICommand = {
    name: "translate",
    description: "Translates text to specified language(s).",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "text",
            description: "Text to translate",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "to",
            description: "Langauge to translate to",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "from",
            description: "Language to translate from (will attempt to auto-detect, if not provided)",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    ephemeral: false,
    run: async(_: Client, interaction: CommandInteraction) => {
        const text = interaction.options.get("text", true).value!.toString();
        const to = interaction.options.get("to", true).value!.toString();
        const from = interaction.options.get("from", false)?.value?.toString();
        const result = await translator(text, to, from);
        interaction.followUp({content: result});
    }
}
