import translator from "./translator";

/**
 * Generated from https://translate.google.com
 *
 * The languages that Google Translate supports (as of 7/5/2020) alongside
 * their ISO 639-1 codes
 * @see https://cloud.google.com/translate/docs/languages
 * @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */

 const languages: { [key: string]: string } = {
    "auto": "Automatic",
    "af": "Afrikaans",
    "sq": "Albanian",
    "am": "Amharic",
    "ar": "Arabic",
    "hy": "Armenian",
    "az": "Azerbaijani",
    "eu": "Basque",
    "be": "Belarusian",
    "bn": "Bengali",
    "bs": "Bosnian",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "ny": "Chichewa",
    "zh-cn": "Chinese Simplified",
    "zh-tw": "Chinese Traditional",
    "co": "Corsican",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "tl": "Filipino",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Frisian",
    "gl": "Galician",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek",
    "gu": "Gujarati",
    "ht": "Haitian Creole",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "iw": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "ig": "Igbo",
    "id": "Indonesian",
    "ga": "Irish",
    "it": "Italian",
    "ja": "Japanese",
    "jw": "Javanese",
    "kn": "Kannada",
    "kk": "Kazakh",
    "km": "Khmer",
    "ko": "Korean",
    "ku": "Kurdish (Kurmanji)",
    "ky": "Kyrgyz",
    "lo": "Lao",
    "la": "Latin",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "lb": "Luxembourgish",
    "mk": "Macedonian",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mi": "Maori",
    "mr": "Marathi",
    "mn": "Mongolian",
    "my": "Myanmar (Burmese)",
    "ne": "Nepali",
    "no": "Norwegian",
    "ps": "Pashto",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pa": "Punjabi",
    "ro": "Romanian",
    "ru": "Russian",
    "sm": "Samoan",
    "gd": "Scots Gaelic",
    "sr": "Serbian",
    "st": "Sesotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "es": "Spanish",
    "su": "Sundanese",
    "sw": "Swahili",
    "sv": "Swedish",
    "tg": "Tajik",
    "ta": "Tamil",
    "te": "Telugu",
    "th": "Thai",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "cy": "Welsh",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zulu"
};

export default languages;

/**
 * Returns the ISO 639-1 code of the desiredLang – if it is supported by
 * Google Translate
 * @param {string} language The name or the code of the desired language
 * @returns {string|boolean} The ISO 639-1 code of the language or null if the
 * language is not supported
 */
export function getISOCode(language: string): string | null {
    if (!language) {
        return null;
    }

    language = language.toLowerCase();

    if (language in languages) {
        return language;
    }

    if (["zh", "Chinese"].includes(language)) {
        return "zh-cn";
    }

    const keys = Object.keys(languages).filter((key: string) => languages[key].toLowerCase() === language);

    return keys[0] || null;
}

/**
 * Returns the name of a language, from the ISO 639-1 code – if it is supported by
 * Google Translate
 * @param {string} code The code of the desired language
 * @returns {string|null} The ISO 639-1 code of the language or null if the
 * language is not supported
 */
 export function getLanguageFromISOCode(code: string): string | null {
    if (!code) {
        return null;
    }

    code = code.toLowerCase();

    if (code === "zh") {
        return languages["zh-cn"];
    }

    const keys = Object.keys(languages).filter((key: string) => key.toLowerCase() === code);

    return languages[keys[0]] || null;
}

/**
 * Returns true if the desiredLang is supported by Google Translate and false otherwise
 * @param {String} language The ISO 639-1 code or the name of the desired language.
 * @returns {boolean} If the language is supported or not.
 */
export function isSupported(language: string): boolean {
    return Boolean(getISOCode(language));
}

// export async function getTranslatedLanguages(): Promise<{ [key: string]: string }> {
//     const translatedLanguages: {[key: string]: string} = {};
//     for (const [iso, language] of Object.entries(languages)) {
//         if(iso === "auto"){
//             continue;
//         }

//         const translatedLanguage = await translator(language, iso);

//         translatedLanguages[iso] = `${translatedLanguage} (${language})`;
//     }

//     return translatedLanguages;
// }
