import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { ICommand } from "../ICommand";
import languages from "../Language/language";

export const TranslateLanguages: ICommand = {
    name: "translate-languages",
    description: "Displays supported languages for the translate functions",
    type: ApplicationCommandType.ChatInput,
    ephemeral: true,
    run: async(_: Client, interaction: CommandInteraction) => {
        const result = `Supported languages:
        ${Object.entries(languages).filter(([iso]) => iso !== "auto").map(([iso, language]) => `\n\t${iso} (${language})`)}
You can use the abbreviation, or the full name.`
        interaction.followUp({content: result, ephemeral: true});
    }
}
