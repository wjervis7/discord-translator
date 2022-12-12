import { Client, Message, MessageReaction, PartialMessageReaction } from "discord.js";
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
            return;
        }

        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        try {
            const reply = await translateMessage(reaction, flagCountry[0].code);

            timeouts[reply.id] = setTimeout(async () => {
                await reply.delete();
                await reaction.remove();
                delete timeouts[reply.id];
            }, 60000);

        } catch (e: unknown) {
            const message = getErrorMessage(e);
            console.error(message);
            return;
        }
    });
};

const translateMessage = async (reaction: MessageReaction | PartialMessageReaction, countryCode: string): Promise<Message> => {
    const country = clm.getCountryByAlpha2(countryCode);
    const languageCode = getISOCode(country?.languages[0] || "") || "";
    const language = getLanguageFromISOCode(languageCode);
    const messageContent = reaction.message.content || "";

    const {from: {language: {iso: from}}, text} = await translator(messageContent, languageCode);

    const fromLanguage = getLanguageFromISOCode(from);

    let headerText = `Translated message from ${fromLanguage}, to ${language}:`;
    let footerText = "This message will automatically delete in 60s. To prevent this, react to this message with";

    headerText = (await translator(headerText, languageCode)).text;
    footerText = `${(await translator(footerText, languageCode)).text} :lock:`;

    const reply = await reaction.message.channel.send(`${headerText}
> ${text.split(/\r?\n/).join("\n > ")}
${footerText}`);

    return reply;
};
