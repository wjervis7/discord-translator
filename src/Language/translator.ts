import translate from "@iamtraction/google-translate";
import { isSupported } from "./language";

const errorMessage = "Language is not supported. Use the `/translate-languages` command, to see eligible languages.";

interface TranslateResponse {
    /** The translated text */
    text: string;
    from: {
        language: {
            /** Whether or not the API suggest a correction in the source language. */
            didYouMean: boolean;
            /** The ISO 639-1 code of the language that the API has recognized in the text. */
            iso: string;
        };
        text: {
            /** Whether or not the API has auto corrected the original text. */
            autoCorrected: boolean;
            /** The auto corrected text or the text with suggested corrections. Only returned if `from.text.autoCorrected` or `from.text.didYouMean` is `true`. */
            value: string;
            /** Wherether or not the API has suggested corrections to the text. */
            didYouMean: boolean;
        };
    };
    /** The raw response from Google Translate servers. Only returned if `options.raw` is `true` in the request options. */
    raw: string;
};

export default async (text: string, to: string, from = "auto"): Promise<TranslateResponse> => {
    if(!isSupported(to)){
        throw Error(errorMessage);
    }

    const translateOpts = {
        to,
        from
    };

    const result = await translate(text, translateOpts);

    return result;
};
