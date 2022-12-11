import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../Commands";
import { getErrorMessage } from "../utilities";

export default (client: Client): void => {
    client.on("interactionCreate", async(interaction: Interaction) => {
        if(interaction.isCommand() || interaction.isContextMenuCommand()){
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);

    if(!slashCommand){
        interaction.followUp({content: "An error has occurred"});
        return;
    }

    await interaction.deferReply({ephemeral: slashCommand.ephemeral});

    try {
        await slashCommand.run(client, interaction);
    } catch (e: unknown) {
        const message = getErrorMessage(e);
        await interaction.followUp({ ephemeral: slashCommand.ephemeral, content: message});
    }
};
