import translate from "@iamtraction/google-translate";
import { isSupported } from "./language";

const errorMessage = "Language is not supported. Use the `/translate-languages` command, to see eligible languages.";

export default async (text: string, to: string, from = "auto"): Promise<string> => {
    if(!isSupported(to)){
        throw Error(errorMessage);
    }

    const translateOpts = {
        to,
        from
    };

    const result = await translate(text, translateOpts);

    return result.text;
};
