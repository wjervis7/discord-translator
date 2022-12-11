import { Client, MessageReaction, PartialMessageReaction } from "discord.js";
const emojiFlags = require("emoji-flags"); // eslint-disable-line @typescript-eslint/no-var-requires
import clm from "country-locale-map";
import translator from "../Language/translator";
import { getISOCode, getLanguageFromISOCode } from "../Language/language";
import { getErrorMessage } from "../utilities";

interface IEmoji {
    code: string,
    emoji: string,
    unicode: string,
    name: string,
    title: string
}

const timeouts: {[key: string]: NodeJS.Timeout} = {};

export default (client: Client): void => {
    client.on("messageReactionAdd", async (reaction: MessageReaction | PartialMessageReaction) => {
        const messageId = reaction.message.id;
        if (messageId in timeouts) {
            if (reaction.emoji.identifier === "%F0%9F%94%92") {
                clearTimeout(timeouts[messageId]);
                delete timeouts[messageId];
            }
        }

        if (reaction.message.author?.bot) {
            return;
        }

        const flagCountry = emojiFlags.data.filter((e: IEmoji) => e.emoji === decodeURIComponent(reaction.emoji.identifier));
        if(!flagCountry.length){
            await reaction.message.reply("Unable to find country for flag; cannot perform translation.");
            return;
        }

        try {
            const country = clm.getCountryByAlpha2(flagCountry[0].code);
            const languageCode = getISOCode(country?.languages[0] || "") || "";
            const language = getLanguageFromISOCode(languageCode);
            const messageContent = reaction.message.content || "";
    
            const translatedMessage = await translator(messageContent, languageCode);

            const reply = await reaction.message.reply(`Translated message to ${language}:
> ${translatedMessage.split(/\r?\n/).join("\n > ")}
This message will automatically delete in 60s. To prevent this, react to this message with :lock:`);

            timeouts[reply.id] = setTimeout(async () => {
                await reply.delete();
                await reaction.remove();
                delete timeouts[reply.id];
            }, 60000);
        } catch (e: unknown) {
            const message = getErrorMessage(e);
            await reaction.message.reply(message);
        }
    });
};
